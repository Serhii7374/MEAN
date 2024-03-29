import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface Post {
  title: string,
  content: string,
  _id: string,
  imagePath: string,
  creator: string
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsSubject = new BehaviorSubject<any>('');
  public posts$ = this.postsSubject.asObservable();

  private countSubject = new BehaviorSubject<any>('');
  public postsCount$ = this.countSubject.asObservable();

  private singlePostSubject = new BehaviorSubject<any>('');
  public singlePost$ = this.singlePostSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPosts(pageSize: number, page: number): void {
    const queryParams = `?pagesize=${pageSize}&page=${page}`;
    this.http.get<{message: string, posts: any, maxPosts: number }>('http://localhost:3000/api/posts' + queryParams)
      .pipe(
        map(postData => (
          { posts: postData.posts
            .map(
              (post: Post) => ({
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creatorId: post.creator
              })),
        maxPosts: postData.maxPosts
          }))
      )
      .subscribe(postData => {
        console.log(postData)
        this.postsSubject.next(postData.posts);
        this.countSubject.next(postData.maxPosts);
      });
  }

  getPostsById(id: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/posts/' + id)
        .pipe(map(postData => ({
          title: postData.title,
          content: postData.content,
          id: postData._id,
          imagePath: postData.imagePath
        })));
  }

  updatePost(id: string, post: any): void {
    this.http.put<any>('http://localhost:3000/api/posts/' + id, post).subscribe((res) => {
      console.log(res);
    });
  }

  addPost(post: any): void {
    const userId = localStorage.getItem('userId')!.toString()
    console.log('addPost userId', userId)
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', post.image, post.title);
    postData.append('creator', userId);
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
      .subscribe((responseData) => {
        post.id = responseData.post._id;
        post.imagePath = responseData.post.imagePath;
        post.creatorId = userId;
        const currentPosts = this.postsSubject.getValue();
        this.postsSubject.next([...currentPosts, post]);
      });
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete('http://localhost:3000/api/posts/' + id);
  }

}

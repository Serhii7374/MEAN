import {ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../shared/services/post.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatPaginator
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  posts$ = this.postsService.posts$;
  maxPosts$ = this.postsService.postsCount$;
  userIsLoggedIn = false;
  imagePreview!: string;
  pageSize = 2;
  currentPage = 1;
  userId = '';

  constructor(private postsService: PostService,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              private authService: AuthService) {
    this.checkIsUserAuth();
  }

  ngOnInit(): void {
    this.getPosts();
    this.userId = localStorage.getItem('userId')?.toString() || '';
  }

  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    image: [null]
  });

  getPosts(): void {
    this.postsService.getPosts(this.pageSize, this.currentPage);
  }

  addPost(): void {
    this.postsService.addPost(this.form.value);
  }

  deletePost(id: string): void {
    this.postsService.deletePost(id).subscribe(() => {
      this.getPosts();
    });
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.form.patchValue({ image: file as any });
      this.form.get('image')!.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = (): void => {
        this.imagePreview = reader.result as string;
        this.cdr.detectChanges();

      };
      reader.readAsDataURL(file);
    }
  }

  onPageChange(pageData: PageEvent): void {
    this.currentPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.postsService.getPosts(this.pageSize, this.currentPage);
  }

  checkIsUserAuth(): void {
    effect(() => {
      this.userIsLoggedIn = this.authService.userIsLoggedIn()
      this.cdr.detectChanges();
    });
  }

  checkUserId(userId: string): boolean {
    console.log('this.userId is ', this.userId, 'userId is  ' , userId)
    return !(this.userId === userId);
  }
}

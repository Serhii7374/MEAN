import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../shared/services/post.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPostComponent implements OnInit {
  postId!: string;
  post!: any;
  isLoading = false;

  constructor(private route: ActivatedRoute, private postsService: PostService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('true');
    this.isLoading = true;
    this.getPostId();
    this.getPost();
  }

  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  getPostId(): void {
    this.postId = this.route.snapshot.params['id'];
  }

  getPost(): void {
    this.postsService.getPostsById(this.postId).subscribe((post) => {
      this.post = post;
      this.form.setValue({
        title: post.title,
        content: post.content
      });
      this.isLoading = false;
      console.log('false');
      this.cdr.detectChanges();
    });
  }

  updatePost(): void {
    this.postsService.updatePost(this.postId, this.form.value);
  }
}

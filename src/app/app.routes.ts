import { Routes } from '@angular/router';
import { PostsComponent } from "./posts/posts/posts.component";
import { EditPostComponent } from "./posts/edit-post/edit-post.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";

export const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  },
  {
    path: 'edit-post/:id',
    component: EditPostComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: '**',
    redirectTo: '',
  }
];

import { Routes } from '@angular/router';
import { PostsComponent } from "./components/posts/posts.component";
import { EditPostComponent } from "./components/edit-post/edit-post.component";

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
    path: '**',
    redirectTo: '',
  }
];

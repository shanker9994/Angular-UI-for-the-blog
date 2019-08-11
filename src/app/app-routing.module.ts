import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './blog/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { SearchComponent } from './blog/search/search.component';
import { CreatepostComponent } from './blog/createpost/createpost.component';
import { ErrorComponent } from './error/error/error.component';
import { PostdetailComponent } from './blog/postdetail/postdetail.component';
import { TagsComponent } from './blog/tags/tags.component';
import { AuthComponent } from './user/auth/auth.component';
import { RouteGaurdService } from './services/gaurd/route-gaurd.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blogs', component: HomeComponent },
  { path: 'blogs/:postId', component: PostdetailComponent },
  { path: 'blogs/posts/tags/:tagName', component: TagsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blogs/users/login', component: AuthComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'search', component: SearchComponent },
  { path: 'blogs/admin/createpost', component: CreatepostComponent, canActivate: [RouteGaurdService] },
  { path: '**', component: ErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

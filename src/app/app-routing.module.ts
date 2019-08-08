import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { HomeComponent } from './home/home.component';
import { FollowingComponent } from './following/following.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyPostComponent } from './my-post/my-post.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { RouteGuard } from './auth/route-guard';

const routes:Routes=[
  {path:'', component:HomeComponent},
  {path:'all-posts', component:AllPostsComponent, canActivate:[RouteGuard]},
  {path:'following', component:FollowingComponent, canActivate:[RouteGuard]},
  {path:'favorites', component:FavoritesComponent, canActivate:[RouteGuard]},
  {path:'my-posts', component:MyPostComponent, canActivate:[RouteGuard]},
  {path:'signup', component:SignUpComponent},
  {path:'login', component:LoginComponent},
];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

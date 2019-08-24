import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { FollowingComponent } from './following/following.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyPostComponent } from './my-post/my-post.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { RouteGuard } from './auth/route-guard';
import { NotificationService } from './shared/notification.service';
import { MyFireservice } from './shared/myfire.service';
import { UserService } from './shared/user.service';
import { PostComponent } from './shared/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllPostsComponent,
    FollowingComponent,
    FavoritesComponent,
    MyPostComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    NotificationComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RouteGuard,NotificationService,MyFireservice,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

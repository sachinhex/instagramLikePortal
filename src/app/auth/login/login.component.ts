import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/shared/notification.service';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { MyFireservice } from 'src/app/shared/myfire.service';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private notifier: NotificationService,
     private myfire: MyFireservice,
     private userService: UserService,
     private router:Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userData => {
        if (userData.user.emailVerified) {
          return this.myfire.getUserFromDatabase(userData.user.uid);
          console.log(userData, "Next");
        }
        else {
          const message = 'Your Email is not verified';
          this.notifier.display('error', message);
          firebase.auth().signOut();
        }
      }).then(userDataFromDatabase => {
        if (userDataFromDatabase) {
          this.userService.set(userDataFromDatabase);
          this.router.navigate(['/all-posts'])
          // console.log(userDataFromDatabase);            
        }
      }).catch(err => {
        this.notifier.display('error', err.message);
      })
  }
}

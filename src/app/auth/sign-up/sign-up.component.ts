import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  

  constructor(private notifier: NotificationService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const fullname = form.value.name;
    const email = form.value.email;
    const password = form.value.password;

    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userData => {
        userData.user.sendEmailVerification();
        console.log(email)
        const message= `We have sent an email verificaton link to ${email}. Please verify to login your account`;
        this.notifier.display('success', message);

        firebase.database().ref('users/' + userData.user.uid).set({
          email: email,
          uid: userData.user.uid,
          registrationDate: new Date().toString(),
          fullname: fullname
        })
        .then(()=>{
          firebase.auth().signOut();
        })
      })
      .catch(err => {
        this.notifier.display('error', err.message);
        console.log(err);
      })

  }
}

import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Instagram Portal';
  ngOnInit(){
    var firebaseConfig = {
      apiKey: "AIzaSyD8wMR3vsZn5YGqkIjD-NoVPIHbhcJAV8g",
      authDomain: "demoinstagram-9f05c.firebaseapp.com",
      databaseURL: "https://demoinstagram-9f05c.firebaseio.com",
      projectId: "demoinstagram-9f05c",
      storageBucket: "demoinstagram-9f05c.appspot.com",
      messagingSenderId: "825615456388",
      appId: "1:825615456388:web:5c39128cd3b4d421"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}

import { Component, OnInit } from '@angular/core';
import { MyFireservice } from '../shared/myfire.service';
import { NotificationService } from '../shared/notification.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {
  personalPostRef: any;
  postList: any=[];

  constructor(
    private myFire: MyFireservice,
    private notifier: NotificationService
  ) { }

  ngOnInit() {
  const uid= firebase.auth().currentUser.uid;
  this.personalPostRef= this.myFire.getPostRef(uid);
  console.log(this.personalPostRef);
  this.personalPostRef.on('child_added', data=>{
    this.postList.push({
      key:data.key,
      data:data.val(),
    })
  });
  console.log(this.postList);
  
  }

  onUploadChange(event) {
    console.log(event);

    const filelist: FileList = event.target.files;
    // console.log(filelist);
    if (filelist.length > 0) {
      const file: File = filelist[0];
      this.myFire.uploadFile(file)
        .then(data => {
          this.notifier.display('success', 'Image uploaded successfully');
          console.log(data['downloadURL']);
          this.myFire.handleImageUpload(data);
        })
        .catch(err => {
          this.notifier.display('error', err.message);
          console.log(err.message);
        });
    }


  }

}

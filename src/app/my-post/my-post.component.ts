import { Component, OnInit } from '@angular/core';
import { MyFireservice } from '../shared/myfire.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {

  constructor(private myFire: MyFireservice,
    private notifier: NotificationService
    ) { }

  ngOnInit() {
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
          
        })
        .catch(err => {
          this.notifier.display('error', err.message);
          console.log(err.message);
        });
    }


  }

}

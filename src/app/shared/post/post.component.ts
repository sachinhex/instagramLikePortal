import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() imageName:string;
  @Input() displayPostedBy:boolean= true;
  @Input() displayFavoritesButton:boolean= true;
  defaultImage:string="https://via.placeholder.com/150";
  imageData: any={};
  @Output() FavoritesClicked= new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref('images').child(this.imageName)
    .once('value')
    .then(snapshot=>{
      this.imageData= snapshot.val();
      this.defaultImage=this.imageData.fileUrl;
      if(this.imageData.uploadedBy.uid === uid){
        this.displayFavoritesButton= false;
      }
    })
  }

  onFavoritesClicked(){
    this.FavoritesClicked.emit(this.imageData)
  }

}

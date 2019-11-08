import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import _ from 'lodash';
import { MyFireservice } from '../shared/myfire.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnDestroy {
  allPost: any=[];
  allRef: any;
  loadmoreRef: any;

  constructor(private myFire: MyFireservice, private notifier: NotificationService) { }

  ngOnInit() {
    this.allRef= firebase.database().ref('allposts').limitToFirst(6);
    this.allRef.on('child_added', data =>{
      this.allPost.push({
        key: data.key,
        data: data.val()
      });
    });    
  }

  onLoadMore(){
    if(this.allPost.length > 0){
      const lastLoadedPost= _.last(this.allPost);
      const lastLoadedPostKey= lastLoadedPost.key;
      this.loadmoreRef= firebase.database().ref('allposts').startAt(null,lastLoadedPostKey).limitToFirst(6+1);
      this.loadmoreRef.on('child_added', data =>{
        if(data.key == lastLoadedPostKey){
          return ;
        }else{
          this.allPost.push({
            key: data.key,
            data: data.val()
          });
        }
      }); 
    }
  }

  onFavoritesClicked(imageData){
    this.myFire.handleFavoriteCliked(imageData)
    .then(data=>{
      this.notifier.display('success', 'image added to favorite');
    })
    .catch(err=>{
      this.notifier.display('error', 'Error while adding image to favorite');
    })
  }
  onFollowClicked(imageData){
    this.myFire.FollowUser(imageData.uploadedBy)
    .then(data=>{
      this.notifier.display('success', 'Following' + ' '  + imageData.uploadedBy.fullname);
    })
    .catch(err=>{
      this.notifier.display('error', err);
    })
  }

  ngOnDestroy(){
    this.allRef.off();
    if(this.loadmoreRef){
      this.loadmoreRef.off();
    }
  }

}

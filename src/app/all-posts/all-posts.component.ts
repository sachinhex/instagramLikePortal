import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import _ from 'lodash';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnDestroy {
  allPost: any=[];
  allRef: any;
  loadmoreRef: any;

  constructor() { }

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

  ngOnDestroy(){
    this.allRef.off();
    if(this.loadmoreRef){
      this.loadmoreRef.off();
    }
  }

}

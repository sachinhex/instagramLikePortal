import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import _ from 'lodash';
import { MyFireservice } from '../shared/myfire.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit, OnDestroy {
  refArray:any= [];
  followPost: any =[];

  constructor(private myFire: MyFireservice) { }

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;
    const followRef = firebase.database().ref('follow').child(uid);
    followRef.once('value', data =>{
      const followUidList = _.keys(data.val());
      console.log(followUidList);
      
      this.getPostFromOtherUser(followUidList);
    })    
  }
  
  getPostFromOtherUser(uidList){
    for(let count in uidList){
      console.log(uidList[count]);      
      this.refArray[count] = this.myFire.getPostRef(uidList[count])
      this.refArray[count].on('child_added',data =>{
        this.followPost.push({
          key: data.key,
          data: data.val()
        })
      })
    }
  }
   ngOnDestroy(){
    _.forEach(this.refArray, ref => {
      if(ref){
        ref.off();
      }
    });
   }
}

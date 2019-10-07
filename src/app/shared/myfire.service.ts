import * as firebase from 'firebase';
import { promise } from 'protractor';
import { userInfo } from 'os';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MyFireservice {
    constructor(private user:UserService){}

    fileUrl: Promise<any>;
    getUserFromDatabase(uid) {
        const ref = firebase.database().ref('users/' + uid);
        return ref.once('value')
            .then(snapshot => snapshot.val())
    }

    /** function uploadFile for uploading file and  creating download fileUrl */
    uploadFile(file) {
        const fileName = file.name;
        const fileRef = firebase.storage().ref().child('image/' + file.name);
        const uploadTask = fileRef.put(file);
        console.log(uploadTask);
        // const fileUrl= fileRef.getDownloadURL();
        // console.log(fileUrl);
//         Get the download URL
//         fileRef.getDownloadURL().then(function (url) {
//             Insert url into an <img> tag to "download"
//         }).catch(function (error) {

//             A full list of error codes is available at
//             https://firebase.google.com/docs/storage/web/handle-errors
//             switch (error.code) {
//                 case 'storage/object-not-found':
//                     File doesn't exist
//                     break;

//                 case 'storage/unauthorized':
//                     User doesn't have permission to access the object
//                     break;

//                 case 'storage/canceled':
//                     User canceled the upload
//                     break;
//                 case 'storage/unknown':
//                     Unknown error occurred, inspect the server response
//                     break;
//     }
// });

        return new Promise((resolve,reject)=>{
            uploadTask.on('state_changed', snapshot => {   
            },error=>{
                reject(error);
            },()=>{
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
                    resolve({fileName,downloadURL});               
                  });
            }
            )
        });
    }

    /**  function handleImageUpload for creating related top level node and handling related uplaod data */
    handleImageUpload(data){
        const user = this.user.getProfile();
        const filename= data.fileName.split(".")['0'];

        console.log(filename);
        
        const newPersonalPostKey = firebase.database().ref().child('myposts').push().key;
        const personalPostDetails={
        name: filename,
        fileUrl:data.downloadURL,
        creationDate: new Date().toString()
        }

        const allPostKey = firebase.database().ref().child('allposts').push().key;
        const allPostDetails={
        name: filename,
        fileUrl:data.downloadURL,
        creationDate: new Date().toString(),
        uploadedBy: user
        }

        const imageDetails={
        name: filename,
        fileUrl:data.downloadURL,
        creationDate: new Date().toString(),
        uploadedBy: user,
        favoriteCount:0
        }


        const updates={};
        updates['/myposts/'+ user.uid + '/' + newPersonalPostKey]=personalPostDetails;
        updates['/allposts/' + allPostKey]=allPostDetails;
        updates['/images/'+ filename]=imageDetails;
        firebase.database().ref().update(updates);
    }

    handleFavoriteCliked(imageData){
        const user = this.user.getProfile();

        const updates={};
        updates['/images/'+ imageData.name + '/' + '/oldFavoriteCount']=imageData.favoriteCount;
        updates['/images/'+ imageData.name + '/' + '/favoriteCount']=imageData.favoriteCount + 1;
        updates['/favorites/'+ user.uid + '/' + imageData.name]=imageData;
        
        return firebase.database().ref().update(updates);
    }
    FollowUser(uploadedUser){
        const user = this.user.getProfile();
        const updates= {};
        updates['/follow/' + user.uid + '/' + uploadedUser.uid] = true;

        return firebase.database().ref().update(updates);
    }
    getPostRef(uid){
        return firebase.database().ref('myposts').child(uid);
    }
}
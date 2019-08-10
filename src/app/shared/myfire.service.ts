import * as firebase from 'firebase';
import { promise } from 'protractor';

export class MyFireservice {
    fileUrl: Promise<any>;
    getUserFromDatabase(uid) {
        const ref = firebase.database().ref('users/' + uid);
        return ref.once('value')
            .then(snapshot => snapshot.val())
    }

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
}
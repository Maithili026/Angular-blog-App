import { Injectable, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { AngularFirestore, fromDocRef } from '@angular/fire/compat/firestore';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root'
})
export class CategoryService{

  constructor(private afs: AngularFirestore , private toastr:ToastrService){} 

  //create the method for save the data
  saveData(data: any){
    this.afs.collection('categories').add(data).then(docref =>{
      console.log(docref);
     this.toastr.success('Data inserted successfully...!');
     
    })
    .catch(err => {console.log(err)})
  }

  loadData(){
     return this.afs.collection('categories').snapshotChanges().pipe(
      map(action =>{
       return  action.map(a =>{

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data}

        })
        })
    )
  }

  updateData(id : string, EditData:any){
    //  this.afs.collection('categories').doc(id).update(EditData).then(docref => {
      this.afs.collection('categories').doc(id).update(EditData).then(docref => {
      this.toastr.success('Data Updated successfully...!');
     })
    }
  
  deleteData(id:any){
    this.afs.collection('categories').doc(id).delete().then(docref => {
      this.toastr.success('data Deleted.....!')
    });
   
  }
}

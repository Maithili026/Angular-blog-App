import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore) { }

  //this method use for load the data thatare save in data base of dashboard post
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
}

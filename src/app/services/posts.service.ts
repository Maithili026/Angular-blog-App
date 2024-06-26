import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs : AngularFirestore ) { }

  loadFeatured(){
    return this.afs.collection('posts',ref=> ref.where('isFeatured','==',true)).snapshotChanges().pipe(
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

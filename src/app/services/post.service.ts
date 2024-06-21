import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private storage: AngularFireStorage) {}

  uploadImage(selectedImage: any, postData: any) {
    const filePath = `postIMG/${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, selectedImage);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(
          (url) => {
            console.log('Image URL:', url);
            // Here you can save the postData along with the image URL to your database
          },
          (error) => {
            console.error('Error fetching download URL:', error);
          }
        );
      })
    ).subscribe(
      () => {
        console.log('Image is being uploaded...');
      },
      (error) => {
        console.error('Error during upload:', error);
      }
    );
  }
}

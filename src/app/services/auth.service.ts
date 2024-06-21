import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedInGuard: boolean = false;
  loggedIn= new BehaviorSubject<any>(undefined);
  isLoggedIn: any;
  //inject in constructor we use the service file for adding the data qurery in database

  constructor( private afAuth : AngularFireAuth,
    private tostr: ToastrService, 
    private router : Router) { }

  //login query for adding the data in firebase
  //login is method name
  login(email: any,password: any){
      this.afAuth.signInWithEmailAndPassword(email , password).then(logref =>{
        this.tostr.success('Logged in  Sucessfully...😊😊');
        this.loadUser();     //mention the below method
        this.loggedIn.next(true);
        this.isLoggedInGuard = true;

        this.router.navigate(['/']); //this is use for going to dasboard if the login credential is correct 
      }).catch(e => {
        this.tostr.warning(e);//catch method provide worning msg for wrong credential
      })
  }
  

  //this method use for when we log in login page after the successful login the toster show in dashboard page
  loadUser(){
    this.afAuth.authState.subscribe(user =>{
     // console.log(JSON.parse(JSON.stringify(user)) );

     localStorage.setItem('user', JSON.stringify(user));
    })
  }


  //logout query
  logout(){
    this.afAuth.signOut().then(() => {
      this.tostr.success('User logged out successfully');
      localStorage.removeItem('user');
      
      this.loggedIn.next(false);
      this.isLoggedInGuard=false;

      this.router.navigate(['/login']);
    }).catch(error => {
     this.tostr.error('Error logging out: ' + error.message);
    });
}
  isLoggedIn$(){
 return this.loggedIn.asObservable();
   }
}

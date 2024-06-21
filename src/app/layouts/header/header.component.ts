import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  userEmail: string = ' ';
  isLoggedIn$ : boolean= false;
  
constructor(private authService : AuthService){}

ngOnInit(): void {
  // Getting the user from localStorage and parsing it only if it's not null
  this.authService.loggedIn.subscribe((res) =>{
    console.log(res);

    if(res){
      this.isLoggedIn$ = res;
    }
  });
  
  const userString = localStorage.getItem('user');

  if (userString) {
    // Check if userString is not null or an empty string
    try {
      const user = JSON.parse(userString); // Parse the JSON string
      if (user && user.email) {
        // Check if the parsed object and email property exist
        this.userEmail = user.email; // Log the email
      } else {
        console.log('Email property does not exist on the user object.');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  } else {
    console.log('No user data found in localStorage.');
  }



}
    onLoggedOut(){
       this.authService.logout();
     }
}


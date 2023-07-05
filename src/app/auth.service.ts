import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private router:Router) { }
  baseURL:string = "http://localhost:3000/api/";

 
  loginUser(user:any) {
    return this.httpClient.post<any>(this.baseURL+'login', user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/Login'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }
}

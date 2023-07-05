import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private _authService:AuthService)
  {

  }
  canActivate():boolean{
    if (this._authService.loggedIn()) {
      console.log('true')
      return true
    } 
    else {
      console.log('false')            
      this.router.navigate(['/Login'])
      return false
    }
  }
}

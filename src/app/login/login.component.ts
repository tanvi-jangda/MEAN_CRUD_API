import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm!:FormGroup;
constructor(private serviceObj:EmployeeService,private router:Router,private fb:FormBuilder,private loginServiceObj:AuthService)
{

}
ngOnInit(): void {
  this.LoginForm=this.fb.group({
Username:['',Validators.required],
Password:['',Validators.required]
  })
}
  btnLoginClick()
  {
    debugger;
    if(this.LoginForm.valid)
    {
      console.log(this.LoginForm.value);
      this.loginServiceObj.loginUser(this.LoginForm.value).subscribe(
        data=>{
          console.log('response '+data);
        localStorage.setItem('token', data.token)
        this.router.navigateByUrl("/GetEmployees")
      },
        err=>console.log(err));
    }
    else{
      alert("Enter username and password");
    }
  }
  
}

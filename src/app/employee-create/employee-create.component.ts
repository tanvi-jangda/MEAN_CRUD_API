import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  //added exclamation mark to denote that we are aware that its not initialized.
  createEmployeeForm!:FormGroup;
 desginationList : any=["System Engineer","Senior System Engineer","IT Analyst","Business Analyst","Quality Assuarance","Support Executive"];
 constructor(private empServiceOBj:EmployeeService, private router:Router,private fb:FormBuilder)
 {

 }
 // Getter to access form control
 get myForm() {
  return this.createEmployeeForm.controls;
}
ngOnInit(): void {
  this.createEmployeeForm=this.fb.group({
    name:['',[Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]],
    email:['',[Validators.required,Validators.email]],
    designation:['',Validators.required],
    phoneNumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern(/^[0-9]*$/)]],
    location:['',Validators.required]
  })
}

 onSubmit()
 {
  if(this.createEmployeeForm.valid)
  {
    this.empServiceOBj.CreateEmployee(this.createEmployeeForm.value).subscribe({
      complete:()=>{
        console.log("Employee Created successfully");
        this.router.navigateByUrl("/GetEmployees");
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }
  else{
    alert("Invalid form submitted");
  }
 }
}

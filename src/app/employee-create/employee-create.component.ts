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
 
ngOnInit(): void {
  this.createEmployeeForm=this.fb.group({
    Name:['',[Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]],
    Email:['',[Validators.required,Validators.email]],
    Designation:['',Validators.required],
    Phone:['',[Validators.required,Validators.minLength(10),Validators.pattern(/^[0-9]*$/)]],
    Location:['',Validators.required]
  })
}

 onSubmit()
 {
  if(this.createEmployeeForm.valid)
  {
    console.log(this.createEmployeeForm.value)
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit{
  desginationList : any=["System Engineer","Senior System Engineer","IT Analyst","Business Analyst","Quality Assuarance","Support Executive"];
  updateEmployeeForm!:FormGroup;

  constructor(private empServiceObj:EmployeeService,private router:Router,private fb:FormBuilder,private actRoute: ActivatedRoute,)
  {

  }
   id = this.actRoute.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.updateEmployee();
    this.updateEmployeeForm=this.fb.group({
    Name:['',[Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]],
    Email:['',[Validators.required,Validators.email]],
    Designation:['',Validators.required],
    Phone:['',[Validators.required,Validators.minLength(10),Validators.pattern(/^[0-9]*$/)]],
    Location:['',Validators.required]
    })
    
    this.getEmployeeById(this.id);
  }

  updateEmployee()
  {
    this.updateEmployeeForm=this.fb.group({
      Name:['',[Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]],
      Email:['',[Validators.required,Validators.email]],
      Designation:['',Validators.required],
      Phone:['',[Validators.required,Validators.minLength(10),Validators.pattern(/^[0-9]*$/)]],
      Location:['',Validators.required]
      })
  }

getEmployeeById(id:any)
{
  if(id!=null || id!="")
  {
    this.empServiceObj.GetEmployeeById(id).subscribe((data)=>{
     this.updateEmployeeForm.setValue({
      Name:data['Name'],
      Email:data['Email'],
      Designation:data['Designation'],
      Phone:data['Phone'],
      Location:data['Location']
     });
    });
  }
}

  onSubmit()
  {
    if(this.updateEmployeeForm.valid)
    {
      this.empServiceObj.UpdateEmployee(this.id,this.updateEmployeeForm.value).subscribe(
        {
          complete:()=>{
            console.log("Employee details updated");
            this.router.navigateByUrl("/GetEmployees")
          },
          error:(e)=>{
            console.log(e);
          }
        }
      )
    }
    else{
      alert("Invalida form submitted");
    }
  }
}

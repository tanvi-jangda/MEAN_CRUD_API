import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{
  Employee:any=[];
constructor(private empServiceObj:EmployeeService,private router:Router)
{

}
ngOnInit() {
  this.empServiceObj.GetEmployees().subscribe((data)=>
  {
    this.Employee=data;
  });
}

DeleteEmployee(id:number){
  if(window.confirm("Are you sure you want to delete this employee?"))
  {
    this.empServiceObj.DeleteEmployee(id).subscribe((
    {
      complete:()=>{
      console.log("Employee deleted successfully");
      this.router.navigateByUrl("/");
      },
      error:(e)=>{
        console.log(e);
      }
    }))
  }
}
}

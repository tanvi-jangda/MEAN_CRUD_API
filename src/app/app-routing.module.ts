import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';

const routes: Routes = [
  {path:'', component:EmployeeListComponent},
  {path:'CreateEmployee', component:EmployeeCreateComponent},
  {path:'UpdateEmployee/:id', component:EmployeeUpdateComponent},
  {path:'GetEmployees', component:EmployeeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
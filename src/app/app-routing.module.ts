import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'CreateEmployee', component:EmployeeCreateComponent,canActivate:[AuthGuard]},
  {path:'UpdateEmployee/:id', component:EmployeeUpdateComponent,canActivate:[AuthGuard]},
  {path:'GetEmployees', component:EmployeeListComponent,canActivate:[AuthGuard]},
  {path:'Login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
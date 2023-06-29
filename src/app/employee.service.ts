import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient) { }
  baseURL:string = "http://localhost:3000/api/";

  //get method
  GetEmployees()
  {
    return this.httpClient.get(this.baseURL+'GetEmployees');
  }

  //get employee by id
  GetEmployeeById(id:any):Observable<any>
  {
    return this.httpClient.get<any>(this.baseURL+'GetEmployeeById/'+id).pipe(
      map((res:any)=>{return res;})
      );
  }

  //create employee
  CreateEmployee(data:any):Observable<any>
  {
    return this.httpClient.post<any>(this.baseURL+'CreateEmployee/', data).pipe(
      map((res:any)=>{return res;})
      );
  }

  //Update employee
  UpdateEmployee(id:any,data:any):Observable<any>
  {
    return this.httpClient.put(this.baseURL+'UpdateEmployee/'+id,data).pipe(
      map((res)=>{return res})
    );
  }

  //delete employee
  DeleteEmployee(id:number):Observable<any>
  {
  return this.httpClient.delete(this.baseURL+'DeleteEmployee/'+id).pipe(
    map((res)=>{return res;})
  );
  }
}

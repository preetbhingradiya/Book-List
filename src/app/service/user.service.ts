import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ApiBaseUrl='http://localhost:3000/user'

  constructor(private http:HttpClient) { }

  getUser(){
    return this.http.get(this.ApiBaseUrl)
  }

  updateUser(name:any,data:any){
    let updateUser = this.ApiBaseUrl +'/'+name
    console.log(updateUser);
    return this.http.patch(updateUser,data)
  }
}

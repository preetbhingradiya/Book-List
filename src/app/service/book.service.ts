import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  ApiBaseUrl='http://localhost:3000/books'

  constructor(private http:HttpClient) { }

  getUser(){
    return this.http.get(this.ApiBaseUrl)
  }

  postUser(data:any){
    return this.http.post(this.ApiBaseUrl,data)
  }

  updateUser(id:any,data:any){
    let updateBook = this.ApiBaseUrl +'/'+id
    return this.http.patch(updateBook,data)
  }
}

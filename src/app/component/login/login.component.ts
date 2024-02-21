import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { UserService } from '../../service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../model/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MatCardModule,MatInputModule,MatFormFieldModule,MatRadioModule,MatButtonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers:[UserService]
})
export class LoginComponent {
  userService:UserService=inject(UserService)

  user:User[]=[];

  constructor(private fromBuilder:FormBuilder,private route:Router){}


  fromGroupData=this.fromBuilder.group({
    username:this.fromBuilder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    password:this.fromBuilder.control('',[Validators.required]),
    email:this.fromBuilder.control('',Validators.compose([Validators.required,Validators.email])),
  })

  login(data:any){
    if(this.fromGroupData.valid){
      this.userService.getUser().subscribe((ele:any)=>{
        this.user=ele
      })

      this.user.filter((res)=>{
        if(res.password==data.password && res.email==data.email){
           Swal.fire({
            position: "top-end",
            icon: "success",
            title: `User ${data.username} has been logged Succeessfully`,
            showConfirmButton: false,
            timer: 1500
          })

          const item = {
            value:data.username,
            expiry: 1*60*1000,
          }

          window.localStorage.setItem("key", JSON.stringify(item.value))

          return setTimeout(()=>{
            this.route.navigate(['home'])
          },1500)
        }
        else{
          return Swal.fire({
            icon: "error",
            title: "Try Agin...",
            text: "Please Enter valid email or password",
          })
        }
      })
    }
  }

  cancel(){
    this.fromGroupData.reset()
  }
}

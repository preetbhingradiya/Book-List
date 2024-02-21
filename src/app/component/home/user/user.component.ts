import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../service/user.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  user:any;

  userService:UserService=inject(UserService)

  ngOnInit(): void {
      this.oneUserDetailes()
  }

  oneUserDetailes() {
    try {
      let token = JSON.parse(window.localStorage.getItem("key"))
      if (token == null) {
        Swal.fire({
          icon: "error",
          title: "Try agin...",
          text: "Check the login route",
        });
      }
      else {
        this.userService.getUser().subscribe((res)=>{
          this.user=res;
        })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  }

}

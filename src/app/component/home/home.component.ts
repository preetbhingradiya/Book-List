import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookService } from '../../service/book.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,HttpClientModule],
  templateUrl: './home.component.html',
  providers:[BookService,UserService]
})
export class HomeComponent {

}

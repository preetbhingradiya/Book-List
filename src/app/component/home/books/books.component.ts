import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { BookService } from '../../../service/book.service';
import { HttpClientModule } from '@angular/common/http';
import { Book } from '../../../model/model';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,HttpClientModule,CheckoutComponent],
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit{
  bookservice:BookService=inject(BookService)

  username:any
  books:Book[]=[]

  ngOnInit(): void {
    this.allBooks()
  }

  allBooks(){
    this.bookservice.getUser().subscribe((res:Book[])=>{
      this.books=res
    })
  }
}

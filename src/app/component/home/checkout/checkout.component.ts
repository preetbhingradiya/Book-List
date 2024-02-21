import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit, inject } from '@angular/core';
import { Book } from '../../../model/model';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from '../../../service/book.service';
import Swal from 'sweetalert2';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  bookservice: BookService = inject(BookService)
  UserService: UserService = inject(UserService)
  bookList: Book[] = []
  isShow: boolean = false
  bookTitl: string

  ngOnInit(): void {
    this.allBooks()
  }


  allBooks() {
    this.bookservice.getUser().subscribe((res: Book[]) => {
      this.bookList = res
    })
  }

  purchaseBook(book: Book) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "purchase"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "SuccessFull!",
          text: "Your Purchase this book",
          icon: "success"
        });

        // ADD USER NAME IN BOOK
        let token = JSON.parse(window.localStorage.getItem("key"))
        let purchaseBook = this.bookList.filter((ele: Book) => ele.id == book.id)
        let data = purchaseBook.map((ele) => ele.username = token);

        // console.log({username:data});

        // ADD BOOK NAME IN USER
        let ParchesebookName = purchaseBook.map((book) => book.name);

        this.UserService.getUser().subscribe((ele: User[]) => {
          let user = ele.filter((ele) => ele.username == token)
          let bookName = user.map((ele) => ele.book.concat(...ParchesebookName))

          console.log(purchaseBook[0].price, user[0].volet);

          if (purchaseBook[0].price <= user[0].volet) {
            this.UserService.updateUser(user[0].id, { book: bookName,volet:user[0].volet-purchaseBook[0].price}).subscribe((res: User[]) => {
              return res;
            })

            this.bookservice.updateUser(book.id, { username: data,stock:purchaseBook[0].stock-purchaseBook[0].qty }).subscribe((res: Book[]) => {
              this.bookList = res
            })
          }
          else {
            Swal.fire({
              icon: "warning",
              title: "Check The Volet...",
              text: "Your Volet is less Then to this book, So try purchase to another book",
            })
          }

        })

      }
    });
  }

  increment(id:any){
    this.bookservice.getUser().subscribe((res:Book[])=>{
      let match= res.filter((ele:Book)=>ele.id==id)
      if(match[0].stock>match[0].qty){
        
        match[0].qty++;
        let updatePrice=match[0].previcePrice*match[0].qty

        this.bookservice.updateUser(id,{qty:match[0].qty,price:updatePrice}).subscribe((res:any)=>{
          res.qty || res.price
          window.location.reload()
        })
      }
      else{
        Swal.fire({
          icon: "warning",
          title: "Alert !",
          text: "Not Increse Quantity greater to the stock...",
        })
      }
    })
  }

  decrement(id:any){
    this.bookservice.getUser().subscribe((res:Book[])=>{
      let match= res.filter((ele:Book)=>ele.id==id)
      if(1<match[0].qty--){
        let updatePrice=match[0].price-match[0].previcePrice

        this.bookservice.updateUser(id,{qty:match[0].qty,price:updatePrice}).subscribe((res:any)=>{
          res.qty
          window.location.reload()
        })
      }
      else{
        Swal.fire({
          icon: "warning",
          title: "Alert !",
          text: "Minimum 1 Quantity is required",
        })
      }
    })
  }

}

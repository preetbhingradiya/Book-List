import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { BooksComponent } from './component/home/books/books.component';
import { AuthguardService } from './service/authGaurd.service';
import { UserComponent } from './component/home/user/user.component';
import { CheckoutComponent } from './component/home/checkout/checkout.component';

export const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[AuthguardService],
    children:[
      {
        path:'booklist',
        component:BooksComponent
      },
      {
        path:'user',
        component:UserComponent
      },
      {
        path:'checkout',
        component:CheckoutComponent
      }
    ]
  },
  {
    path:'**',
    component:LoginComponent
  },
];

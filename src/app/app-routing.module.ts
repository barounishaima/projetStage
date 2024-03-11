import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { SignupComponent } from './signup/signup.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { authGuard } from './auth.guard';
import { StockComponent } from './stock/stock.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';

const routes: Routes = [
  
  {path:'login',title:'login',component:LoginComponent},
  {path:'orders',title:'orders',component:OrdersComponent},
  {path:'users',title:'users',component:UsersComponent},
  {path:'signup',title:'signup',component:SignupComponent},
  {path:'adminlogin',title:'adminlogin',component:AdminloginComponent},
  {path:'stock',title:'stock',component:StockComponent},
  {path:'dashboard',title:'dashboard',component:DashboardComponent},
  {path:'orderdetails',title:'orderdetails',component:OrderdetailsComponent},

  {path:'',redirectTo:'/login',pathMatch:'full'},

  
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit{
  constructor(private http:HttpClient, private router:Router, private userService:UserService){}
  ngOnInit(): void {
    
  }
  instock(){
    this.router.navigate(['/stock']);
  }
  Users(){
    this.router.navigate(['/users']);
  }
  Orders(){
    this.router.navigate(['/orders']);
  }
  dashboard(){
    this.router.navigate(['/dashboard']);
  }
  logout(){
    this.router.navigate(['/login']);
  }
}

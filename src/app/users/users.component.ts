import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users: User[] = [];
  constructor(private http:HttpClient, private router:Router, private userService:UserService){}
  ngOnInit(): void {
    this.loadUsers();
    this.userService.getusers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  loadUsers(): void {
    this.userService.getusers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(firstname: string): void {
    this.userService.deleteUser(firstname).subscribe(
      () => {
        // If the deletion is successful, update the users array
        this.loadUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
  adminauth(){
    this.router.navigate(['/adminlogin']);
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

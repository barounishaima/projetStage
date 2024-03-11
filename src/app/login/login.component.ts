import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users:any[]=[];
  loginform! :FormGroup;
  userEmail: string = '';
constructor(private fb:FormBuilder, private router:Router,private userService:UserService,private http:HttpClient ){}
ngOnInit(): void {
  this.loginform = this.fb.group({
      email : ['',[Validators.required] ],
      password : ['',[Validators.required] ]
    });
    
    
      
    
}
onSubmit() {
  const { email, password } = this.loginform.value;
 
  
  this.http.post('http://localhost:3000/login', { email, password })
    .subscribe((response) => {
      console.log(response);
      this.router.navigate(['/dashboard']);
    }, (error) => {
      console.error(error);
      alert('email or password are incorrect');
    });
    
  }

public signup(){
  this.router.navigate(['/signup']);
}      

public get Email(){
  return this.loginform.get('email');
}




  
  
  



}

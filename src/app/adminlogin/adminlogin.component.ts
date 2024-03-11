import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit{
  users:any[]=[];
  Adminloginform!: FormGroup;
  constructor( private router:Router,private userService:UserService){}
  ngOnInit(): void {
    this.Adminloginform = new FormGroup({
      Adminemail:new FormControl(''),
        Adminpassword:new FormControl ('')})
  }
  public get Adminemail(){
    return this.Adminloginform.get('Adminemail');
  }
  public get Adminpassword(){
    return this.Adminloginform.get('Adminpassword');
  }
  public onSubmit(): void  {
   if ((this.Adminemail?.value=="nouha@gmail.com") && (this.Adminpassword?.value=="newpass")){
    this.router.navigate(['/users']);

   }
   else{
    alert('your email or password are incorrect');
   }
  }

}

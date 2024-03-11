import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import{User} from '../user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  users! : User[];
  signup! : FormGroup;
  constructor(private fb:FormBuilder, private router:Router,private userService:UserService){
  
  }
  ngOnInit(): void {
          
    this.signup = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      phonenumber: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern('^[0-9]+$')]],
      password: ['', Validators.required],
    });
    
    
    }
    public relog(){
      this.router.navigate(['/login']);}

    public get firstname(){
      return this.signup.get('firstname');
    }
    public get lastname(){
      return this.signup.get('lastname');
    }
    public get email(){
      return this.signup.get('email');
    }
    public get phonenumber(){
      return this.signup.get('phonenumber');
    }
    public get password(){
      return this.signup.get('password');
    }
    isvalidfirstname(){
      return this.firstname?.errors?.['required'] && this.firstname?.touched;
    }
    patternfirstname(){
      return this.firstname?.errors?.['pattern'] && this.firstname?.touched;
    }
    isvalidlastname(){
      return this.lastname?.errors?.['required'] && this.lastname?.touched;
    }
    patternlastname(){
     return this.lastname?.errors?.['pattern'] && this.lastname?.touched;
    }
    isvalidemail(){
      return this.email?.errors?.['required'] && this.email?.touched;
    }
    patternemail(){
      return this.email?.errors?.['pattern'] && this.email?.touched;
    }
    isvalidphonenumber(){
      return this.phonenumber?.errors?.['required'] && this.phonenumber?.touched;
    }
    patternphonenumber(){
      return this.phonenumber?.errors?.['maxLength'] && this.phonenumber?.touched && this.phonenumber?.errors?.['pattern'];
    }
    isvalidpassword(){
      return this.password?.errors?.['required'] && this.password?.touched;
    }
    onsubmit(){
      
    const newUser: User = {
    firstname: this.firstname?.value,
    lastname: this.lastname?.value,
    email: this.email?.value,
    phonenumber: this.phonenumber?.value,
    password: this.password?.value,
  };
       this.userService.adduser(newUser).subscribe(addedUser =>{console.log('User added ', addedUser);})
       this.userService.addUserToArray(newUser);
      this.router.navigate(['/login']);
      alert('your account has been created');
    }
}

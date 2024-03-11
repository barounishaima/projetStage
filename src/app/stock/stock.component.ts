import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../item';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  
  items:Item[] =[];
  addstock!: FormGroup;
  showme:boolean=false;
  
  constructor(private router:Router, private userService:UserService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.loadstock();
    this.addstock = this.fb.group({
      itemId: ['', [Validators.required, Validators.pattern('^[1-9]+$')]],
      name: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      quantity: ['', [Validators.required,Validators.pattern('^[1-9]+$')]],
    });
    this.userService.getstock().subscribe(
      (data: Item[]) => {
        this.items = data;
        console.log('stock in component:', this.items);
      },
      (error) => {
        console.error('Error fetching stock:', error);
      }
    );
  }
  showdiv(){
    this.showme=!this.showme;
  }
  
  logout(){
    this.router.navigate(['/login']);
  }
  instock(){
    this.router.navigate(['/stock']);
  }
  Users(){
    this.router.navigate(['/adminlogin']);
  }
  Orders(){
    this.router.navigate(['/orders']);
  }
  dashboard(){
    this.router.navigate(['/dashboard']);
  }
  stocksubmit() {
    const newitem: Item = {
      itemId: this.addstock.get('itemId')?.value,
      name: this.addstock.get('name')?.value,
      quantity: this.addstock.get('quantity')?.value,
    };
  
    this.userService.additem(newitem).subscribe(addeditem => {
      console.log('item added ', addeditem);
      this.userService.additemToArray(addeditem);
      this.addstock.reset();
      
      this.loadstock();
    });
  }
  loadstock(): void {
    this.userService.getstock().subscribe(
      (data: Item[]) => {
        this.items = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  deletestock(itemId: string): void {
    this.userService.deletestock(itemId).subscribe(
      () => {
        // If the deletion is successful, update the users array
        this.loadstock();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}

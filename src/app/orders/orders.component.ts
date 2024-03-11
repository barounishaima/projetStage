import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../user.service';
import { Order } from '../order';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] =[];
  showme:boolean=false;
  addorder!: FormGroup;
  constructor(private fb:FormBuilder,private router:Router,private userService:UserService){}
  ngOnInit(): void {
    this.addorder = this.fb.group({
      orderId: ['', [Validators.required, Validators.pattern('^[1-9]+$')]],
      date: ['', [Validators.required]],
      customer: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      destination: ['', [Validators.required,Validators.pattern('^[a-z A-Z0-9-]*$')]],
      items: ['', Validators.required],
    });
    
    this.userService.getorders().subscribe(
      (data: Order[]) => {
        this.orders = data;
        console.log('Orders in component:', this.orders);
        this.orders.forEach(order => {
          if (Object.values(order).some(value => value === undefined)) {
            console.error('Order with undefined properties:', order);
          }
        });
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  showdiv(){
    this.showme=!this.showme;
  }
  instock(){
    this.router.navigate(['/stock']);
  }
  users(){
    this.router.navigate(['/adminlogin']);
  }
  Orders(){
    this.router.navigate(['/orders']);
  }
  details(){
    this.router.navigate(['/orderdetails']);
  }
  dashboard(){
    this.router.navigate(['/dashboard']);
  }
  logout(){
    this.router.navigate(['/login']);
  }
  public get orderId(){
    return this.addorder.get('orderId'); 
  }
  public get customer(){
    return this.addorder.get('customer'); 
  }
  public get date(){
    return this.addorder.get('date'); 
  }
  public get destination(){
    return this.addorder.get('destination'); 
  }
  public get items(){
    return this.addorder.get('items'); 
  }
  isvalidorderId(){
    return this.orderId?.errors?.['required'] && this.orderId?.touched;
  }
  patternorderId(){
    return this.orderId?.errors?.['pattern'] && this.orderId?.touched;
  }
  isvalidcustomer(){
    return this.customer?.errors?.['required'] && this.customer?.touched;
  }
  patterncustomer(){
    return this.customer?.errors?.['pattern'] && this.customer?.touched;
  }
  isvaliddate(){
    return this.date?.errors?.['required'] && this.date?.touched;
  }
  isvaliditemes(){
    return this.items?.errors?.['required'] && this.items?.touched;
  }
  isvaliddestination(){
    return this.destination?.errors?.['required'] && this.destination?.touched;
  }
  patterdestination(){
    return this.destination?.errors?.['pattern'] && this.destination?.touched;
  }

  orderSubmit() {
    const newOrder: Order = {
      orderId: this.addorder.get('orderId')?.value,
      Date: this.addorder.get('date')?.value,
      Customer: this.addorder.get('customer')?.value,
      destination: this.addorder.get('destination')?.value,
      Items: this.addorder.get('items')?.value,
    };
  
    this.userService.addorder(newOrder).subscribe(addedOrder => {
      console.log('Order added ', addedOrder);
      this.userService.addorderToArray(addedOrder);
      this.addorder.reset();
      this.loadorder();
    });
  }
  loadorder(): void {
    this.userService.getorders().subscribe(
      (data: Order[]) => {
        this.orders = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  deleteorder(orderId: string): void {
    this.userService.deleteorder(orderId).subscribe(
      () => {
        // If the deletion is successful, update the users array
        this.loadorder();
      },
      (error) => {
        console.error('Error deleting order:', error);
      }
    );
  }
}

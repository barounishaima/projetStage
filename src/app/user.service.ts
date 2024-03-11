import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import{User} from '../app/user';
import { Order } from './order';
import { Item } from './item';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private authenticated = false;
  constructor(private http: HttpClient) { }
  private refreshSubject = new Subject<void>();
  refresh = this.refreshSubject.asObservable();

  triggerRefresh(): void {
    this.refreshSubject.next();
  }

  private Url = 'http://localhost:3000';
  users: User[]=[];
  stock: Item[]=[];
  orders: Order[]=[];
  
  
  public getuserbypassword():Observable<any>{
    return this.http.get(`${this.Url}/users/password`);
  }
  public getusers(): Observable<User[]> {
    return this.http.get<any>(`${this.Url}/users`).pipe(
      map(response => response.data),  
      tap(data => console.log('Users data:', data)),
      catchError(error => {
        console.error('Error fetching users:', error);
        throw error;
      })
    );
  }
  
   public adduser(u:User): Observable<User[]>{
     return this.http.post<User[]>(`${this.Url}/users`, u);
   }
  public addUserToArray(user: any): void {
     this.users.push(user);
   }
   public addorder(o:Order): Observable<Order[]>{
    return this.http.post<Order[]>(`${this.Url}/orders`, o);
  }
   public addorderToArray(order: any): void {
    this.orders.push(order);
  }
  public additem(i:Item): Observable<Item[]>{
    return this.http.post<Item[]>(`${this.Url}/stock`, i);
  }
 public additemToArray(item: any): void {
    this.stock.push(item);
  }
   public getorders(): Observable<Order[]> {
    return this.http.get<any>(`${this.Url}/orders`).pipe(
      map(response => response.data),  // Extract the 'data' property
      tap(data => console.log('Orders data:', data)),
      catchError(error => {
        console.error('Error fetching orders:', error);
        throw error;
      })
    );
  }
  
  
  

  
  getTotalUsersCount(): Observable<any> {
    return this.http.get(`${this.Url}/users/count`);
  }
  getTotalordersCount(): Observable<any> {
    return this.http.get(`${this.Url}/orders/count`);
  }
  getTotalstockCount(): Observable<any> {
    return this.http.get(`${this.Url}/stock/count`);
  }
  public getstock(): Observable<Item[]> {
    return this.http.get<any>(`${this.Url}/stock`).pipe(
      map(response => response.data),  
      tap(data => console.log('stock data:', data)),
      catchError(error => {
        console.error('Error fetching stock:', error);
        throw error;
      })
    );
  }
 
 
 
    getProfileDetails(header: any): Observable<any> {
      return this.http.get(`${this.Url}/users`, header);
    }
  public isAuthenticated(): boolean {
    return this.authenticated;
  }
  public deleteUser(firstname: string): Observable<any> {
    return this.http.delete(`${this.Url}/users/${firstname}`);
  }
  public deleteorders(orderId: string): Observable<any> {
    return this.http.delete(`${this.Url}/orders/${orderId}`);
  }
  public deletestock(itemId: string): Observable<any> {
    return this.http.delete<void>(`${this.Url}/stock/${itemId}`);
  }
  public deleteorder(orderId: string): Observable<any> {
    return this.http.delete<void>(`${this.Url}/orders/${orderId}`);
  }
  getUserData(firstname: string, lastname: string): Observable<any> {
    const url = `${this.Url}/users/${firstname}/${lastname}`;
    return this.http.get(url);
  }
 

 
}

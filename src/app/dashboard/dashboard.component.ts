import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  firstname!: string;
  lastname!: string;
  userData: User[]=[];
  totalUsersCount: number = 0;
  totalordersCount: number = 0;
  totalstockcount: number =0;
  datetime : Date | undefined;
  
  constructor(private router:Router,private userService:UserService){
    
  }
  
  ngOnInit(): void {
    const ctx = document.getElementById('myChart');
                  
                    new Chart("myChart", {
                      type: 'bar',
                      data: {
                        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
                        datasets: [{
                          label: 'number of sales',
                          data: [12, 19, 3, 5, 2, 3],
                          borderWidth: 1,   
                          borderColor:['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                          
                          
                        }]
                      },
                      options: {
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }
                    });
                    const don = document.getElementById('don');
                    new Chart("don", {
                      type: 'doughnut',
                     data : {
                      labels: [
                        'stock',
                        'return',
                        'orders'
                      ],
                      datasets: [{
                        label: 'My First Dataset',
                        data: [300, 50, 100],
                        backgroundColor: [
                          'rgb(255, 99, 132)',
                          'rgb(54, 162, 235)',
                          'rgb(255, 205, 86)'
                        ],
                        hoverOffset: 4
                      }]
                    }
                  });
    this.datetime= new Date();
    
    this.userService.getTotalUsersCount().subscribe((data) => {
      this.totalUsersCount = data.count;
    });
    this.userService.getTotalordersCount().subscribe((data) => {
      this.totalordersCount = data.orderCount; 
    });
    this.userService.getTotalstockCount().subscribe((data) => {
      this.totalstockcount = data.stockCount; 
    });
    
    this.getUserData();

  }
  getUserData() {
    this.userService.getUserData(this.firstname, this.lastname).subscribe(
      (response) => {
        console.log(response);
        this.userData = response.data;
      },
      (error) => {
        console.error(error);
        
      }
    );
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
  logout(){
    this.router.navigate(['/login']);
  }
}

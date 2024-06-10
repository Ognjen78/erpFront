import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { RegisterService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User | null = null;
  updatedUser: User = new User();
  orders: Order[] = [];

  constructor(private authService: AuthService, private registerService: RegisterService, private orderService: OrderServiceService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadOrders();
  }

  loadOrders() {
    if (this.user) {
      this.orderService.getOrders().subscribe(
        (response: Order[]) => {
          this.orders = response.filter(order => order.id_user === this.user?.id_user);
        },
        error => {
          console.error('Error loading orders:', error);
        }
      );
    }
  }
  

}

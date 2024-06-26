import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { ProductServiceService } from 'src/app/services/product-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  orderId!: string;
  statusMessage!: string;

  constructor(private productService: ProductServiceService, private orderService : OrderServiceService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  checkOrderStatus() {
  
    this.orderService.getOrderDate(this.orderId).subscribe(
      (response: Order) => {
        console.log(response);
        console.log(response.order_date);
        const orderDate = new Date(response.order_date);
        console.log(orderDate);
        const currentDate = new Date();
        const daysDiff = Math.floor((currentDate.getTime() - orderDate.getTime()) / (1000 * 3600 * 24));

      
        if (daysDiff === 0) {
          this.statusMessage = 'Porudžbina je trenutno u obradi.';
        } else if (daysDiff === 1) {
          this.statusMessage = 'Porudžbina je preuzeta od strane službe.';
        } else if (daysDiff === 2) {
          this.statusMessage = 'Očekujte dostavu danas.';
        } else if (daysDiff >= 3) {
          this.statusMessage = 'Porudžbina je dostavljena.';
        } else {
          this.statusMessage = 'Porudžbina je u procesu isporuke.';
        }
      },
      (error) => {
        console.error('Greška prilikom dobijanja datuma porudžbine:', error);
        this.statusMessage = 'Greška prilikom dobijanja datuma porudžbine. Molimo pokušajte ponovo.';
      }
    );
  }

 



}

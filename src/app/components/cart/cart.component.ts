import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems$: Observable<{ product: Product, quantity: number }[]>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getCart();
  }

  ngOnInit(): void {
    // Sada je `cartItems$` već inicijalizovan u konstruktoru
  }

  getTotal(cartItems: { product: Product, quantity: number }[]): number {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  removeItem(product: Product) {
    this.cartService.removeFromCart(product);
  }

  updateQuantity(product: Product, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(product);
    } else {
      this.cartService.updateQuantity(product, quantity);
    }
  }
}

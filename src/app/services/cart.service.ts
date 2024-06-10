import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: { product: Product, quantity: number }[] = this.loadCart();
  private cartSubject: BehaviorSubject<{ product: Product, quantity: number }[]> = new BehaviorSubject(this.cart);

  getCart(): Observable<{ product: Product, quantity: number }[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product, quantity: number = 1) {
    const existingProduct = this.cart.find(item => item.product.id_product === product.id_product);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
    this.updateCart();
  }

  removeFromCart(product: Product) {
    this.cart = this.cart.filter(item => item.product.id_product !== product.id_product);
    this.updateCart();
  }

  updateQuantity(product: Product, quantity: number) {
    const existingProduct = this.cart.find(item => item.product.id_product === product.id_product);
    if (existingProduct) {
      existingProduct.quantity = quantity;
    }
    this.updateCart();
  }

  clearCart() {
    this.cart = [];
    this.updateCart();
  }

  private updateCart() {
    this.cartSubject.next(this.cart);
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCart(): { product: Product, quantity: number }[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REGISTER_URL, ADMIN_URL,  ORDER_URL, ITEMS_URL, PRODUCT_URL, SHIPPING_URL } from 'src/constants';
import { Admin } from '../models/admin';
import { FormGroupDirective } from '@angular/forms';
import { OrderItem } from '../models/order-item';
import { User } from '../models/user';
import { ShippingAddress } from '../models/shipping-address';
import { Product } from '../models/product';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  public getAdmins(): Observable<any> {
    return this.http.get(`${ADMIN_URL}`);
  }

  public addAdmin(admin: Admin): Observable<any> {
    return this.http.post(`${ADMIN_URL}`, admin);
  }

  public updateAdmin(admin: Admin): Observable<any> {
    return this.http.put(`${ADMIN_URL}/${admin.id_admin}`, admin);
  }

  public deleteAdmin(id: string): Observable<any> {
    return this.http.delete(`${ADMIN_URL}/${id}`);
  }

   // User CRUD operations
   getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${REGISTER_URL}`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${REGISTER_URL}/${user.id_user}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${REGISTER_URL}/${id}`);
  }

  // Shipping Address CRUD operations
  getShippingAddresses(): Observable<ShippingAddress[]> {
    return this.http.get<ShippingAddress[]>(`${SHIPPING_URL}`);
  }

  addShippingAddress(address: ShippingAddress): Observable<ShippingAddress> {
    return this.http.post<ShippingAddress>(`${SHIPPING_URL}`, address);
  }

  updateShippingAddress(address: ShippingAddress): Observable<any> {
    return this.http.put(`${SHIPPING_URL}/${address.id_shipping}`, address);
  }

  deleteShippingAddress(id: number): Observable<any> {
    return this.http.delete(`${SHIPPING_URL}/${id}`);
  }

  // Product CRUD operations
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${PRODUCT_URL}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${PRODUCT_URL}`, product);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(`${PRODUCT_URL}/${product.id_product}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${PRODUCT_URL}/${id}`);
  }

  // Order CRUD operations
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${ORDER_URL}`);
  }

  updateOrder(order: Order): Observable<any> {
    return this.http.put(`${ORDER_URL}/${order.id_order}`, order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${ORDER_URL}/${id}`);
  }

  // Order Items CRUD operations
  getOrderItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${ITEMS_URL}`);
  }

  updateOrderItem(orderItem: OrderItem): Observable<any> {
    return this.http.put(`${ITEMS_URL}/${orderItem.id_order_items}`, orderItem);
  }

  deleteOrderItem(id: number): Observable<any> {
    return this.http.delete(`${ITEMS_URL}/${id}`);
  }
}

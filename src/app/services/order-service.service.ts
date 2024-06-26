import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { ORDER_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private httpClient: HttpClient) { }

  public getOrders(): Observable<any> {
    return this.httpClient.get(`${ORDER_URL}`);
  }

  public getOrderDate(orderId: string): Observable<any> {
    return this.httpClient.get(`${ORDER_URL}/${orderId}`);
  }

  public addOrder(order: any): Observable<any> {
    return this.httpClient.post(`${ORDER_URL}`, order);
  }

  public updateOrder(order: Order): Observable<any> {
    return this.httpClient.put(`${ORDER_URL}/${order.id_order}`, order);
  }

  public deleteOrder(id: number): Observable<any> {
    return this.httpClient.delete(`${ORDER_URL}/${id}`);
  }
}

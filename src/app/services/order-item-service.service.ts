import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITEMS_URL } from 'src/constants';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderItemServiceService {

  constructor(private httpClient: HttpClient) { }

  public getItems(): Observable<any> {
    return this.httpClient.get(`${ITEMS_URL}`);
  }

  public addItem(item: OrderItem): Observable<any> {
    return this.httpClient.post(`${ITEMS_URL}`, item);
  }

  public updateItem(item: OrderItem): Observable<any> {
    return this.httpClient.put(`${ITEMS_URL}/${item.id_order_items}`, item);
  }

  public deleteItem(id: number): Observable<any> {
    return this.httpClient.delete(`${ITEMS_URL}/${id}`);
  }
}

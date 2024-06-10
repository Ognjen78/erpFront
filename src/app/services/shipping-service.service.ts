import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SHIPPING_URL } from 'src/constants';
import { ShippingAddress } from '../models/shipping-address';

@Injectable({
  providedIn: 'root'
})
export class ShippingServiceService {

  constructor(private httpClient: HttpClient) { }

  public getShipping(): Observable<any> {
    return this.httpClient.get(`${SHIPPING_URL}`);
  }

  public addShipping(shipping: ShippingAddress): Observable<any> {
    return this.httpClient.post(`${SHIPPING_URL}`, shipping);
  }

  public updateShipping(shipping: ShippingAddress): Observable<any> {
    return this.httpClient.put(`${SHIPPING_URL}/${shipping.id_shipping}`, shipping);
  }

  public deleteShipping(id: number): Observable<any> {
    return this.httpClient.delete(`${SHIPPING_URL}/${id}`);
  }
}

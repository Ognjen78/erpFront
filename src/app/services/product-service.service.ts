import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRODUCT_URL } from 'src/constants';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private httpClient: HttpClient) { }

  public getProducts(page: number = 1, limit: number = 12 ): Observable<any> {
    const params = new HttpParams()
                .set('page', page.toString())
                .set('limit', limit.toString());
    return this.httpClient.get(`${PRODUCT_URL}`, {params});
  }

  public getProductById(id: number): Observable<any> {
    return this.httpClient.get<Product>(`${PRODUCT_URL}/${id}`);
  }

  public addProduct(product: Product): Observable<any> {
    return this.httpClient.post(`${PRODUCT_URL}`, product);
  }

  public updateProduct(product: Product): Observable<any> {
    return this.httpClient.put(`${PRODUCT_URL}/${product.id_product}`, product);
  }

  public deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(`${PRODUCT_URL}/${id}`);
  }

 /* public searchProducts(searchTerm: string): Observable<Product[]> {
    const params = { searchTerm };
    return this.httpClient.get<Product[]>(`${PRODUCT_URL}/search`, { params });
  }*/
}

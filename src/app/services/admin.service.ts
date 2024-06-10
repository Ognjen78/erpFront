import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_URL } from 'src/constants';
import { Admin } from '../models/admin';
import { FormGroupDirective } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient:HttpClient) { }

  public getAdmins(): Observable<any> {
    return this.httpClient.get(`${ADMIN_URL}`);
  }

  public addAdmin(admin: Admin): Observable<any> {
    return this.httpClient.post(`${ADMIN_URL}`, admin);
  }

  public updateAdmin(admin: Admin): Observable<any> {
    return this.httpClient.put(`${ADMIN_URL}/${admin.id_admin}`, admin);
  }

  public deleteAdmin(id: string): Observable<any> {
    return this.httpClient.delete(`${ADMIN_URL}/${id}`);
  }
}

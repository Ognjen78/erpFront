import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { REGISTER_URL } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  public registerUser(user: User): Observable<any> {
    return this.httpClient.post(`${REGISTER_URL}`, user);
  }

  public updateUser(user: User): Observable<any> {
    return this.httpClient.put(`${REGISTER_URL}/${user.id_user}`, user);
  }

  
}

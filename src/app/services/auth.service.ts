import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../models/login-dto';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AUTH_URL } from 'src/constants';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkIsAuthenticated());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private userRoleSubject = new BehaviorSubject<string | null>(this.getRoleFromToken());
  public userRole$ = this.userRoleSubject.asObservable()

  constructor(private httpClient: HttpClient) {}

  public loginAuth(userLogin: LoginDto): Observable<any> {
    return this.httpClient.post<any>(`${AUTH_URL}`, userLogin).pipe(
      tap(response => {
          console.log('Login response:', response);
          if (response && response.token && response.user) {
              localStorage.setItem('token', response.token);
              localStorage.setItem('user', JSON.stringify(response.user));
              this.isAuthenticatedSubject.next(true);
              this.userRoleSubject.next(response.user.role);
          } else {
              console.error('Invalid login response:', response);
          }
      })
  );
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private checkIsAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  public getUser(): User | null {
    const user = localStorage.getItem('user');
    console.log('Retrieved user from localStorage:', user);
    if (user) {
        try {
            return JSON.parse(user);
        } catch (error) {
            console.error('Error parsing user data:', error);
            return null;
        }
    }
    return null;
}

public setUser(user: User): void {
  localStorage.setItem('user', JSON.stringify(user));
}

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getRoleFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    
    }
    return null;
  }

  public isAdmin(): boolean {
    const role = this.getRoleFromToken();
    return role === 'Admin';
  }

  

}



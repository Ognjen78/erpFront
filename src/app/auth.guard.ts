import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuthenticated = this.authService.isAuthenticated();
      const userRole = this.authService.getRoleFromToken();
      const requiredRole = next.data['role'];

      console.log('isAuthenticated:', isAuthenticated);
    console.log('userRole:', userRole);
    console.log('requiredRole:', requiredRole);

  
      if (isAuthenticated && (!requiredRole || userRole === requiredRole)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}

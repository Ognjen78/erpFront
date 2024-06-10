import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { ProductServiceService } from './services/product-service.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'SPORTBASIC';
  isLoggedIn = false;
  username: string | null = null; 
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
      if (this.isLoggedIn) {
        const user = this.authService.getUser();
        this.username = user ? user.username : null;
        this.userRole = user ? user.role : null;
        console.log(this.userRole);
        
      }
    });
  }

  goToUserProfile() {
    this.router.navigate(['/user-profile']);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.username = null;
    this.userRole = null;
    this.router.navigate(['/login']);
  }
}

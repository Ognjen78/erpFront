import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginDto } from 'src/app/models/login-dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: LoginDto = new LoginDto();

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.loginAuth(this.userLogin).subscribe(response => {
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        
        this.router.navigate(['/home']);
      } else {
        console.error('Invalid login response:', response);
      }
    }, error => {
      console.error('Login error:', error);
    });
  }

  ngOnInit(): void {
  }

}

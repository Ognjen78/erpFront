import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RegisterService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    this.registerService.registerUser(this.user).subscribe(response => {
      console.log('Uspesno registrovanje', response);
      this.router.navigate(['/login']);
    }, error => {
      console.error('Registration error:', error);
      if (error.status === 400) {
        console.error('Validation errors:', error.error.errors);
      }
    });
  }
}

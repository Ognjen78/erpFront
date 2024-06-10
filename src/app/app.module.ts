import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { KontaktComponent } from './components/kontakt/kontakt.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartComponent } from './components/cart/cart.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductScreenComponent } from './components/product-screen/product-screen.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UserComponent } from './components/user/user.component';
import { AuthInterceptor } from './auth.interceptor';
import { RegisterService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProductComponent,
    KontaktComponent,
    CartComponent,
    ProductScreenComponent,
    CheckoutComponent,
    UserComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    MatSnackBarModule
  ],
  providers: [AuthService, RegisterService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { KontaktComponent } from './components/kontakt/kontakt.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductScreenComponent } from './components/product-screen/product-screen.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'home', component: HomeComponent},
  {path:'products', component: ProductComponent},
  {path:'products/:id', component: ProductScreenComponent},
  {path:'contact', component: KontaktComponent},
  {path:'cart', component: CartComponent },
  {path:'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

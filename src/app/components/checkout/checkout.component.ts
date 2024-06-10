import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ShippingAddress } from 'src/app/models/shipping-address';
import { CartService } from 'src/app/services/cart.service';
import { ShippingServiceService } from 'src/app/services/shipping-service.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems$: Observable<{ product: Product, quantity: number }[]>;
  total$: Observable<number>;
  countries$!: Observable<string[]>;
  cities$!: Observable<{ name: string, price: number }[]>;
  selectedCountry: string = '';
  selectedCity: { name: string, price: number } | null = null;
  address: string = '';
  stripe: Stripe | null = null;

  constructor(
    private cartService: CartService, 
    private router: Router, 
    private shippingService: ShippingServiceService,
    private http: HttpClient
  ) {
    this.cartItems$ = this.cartService.getCart();
    this.total$ = this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
    );
  }

  ngOnInit(): void { 
    this.countries$ = this.shippingService.getShipping().pipe(
      map((shippingAddresses: ShippingAddress[]) => shippingAddresses.map(address => address.country)),
      map(countries => countries.filter((value, index, self) => self.indexOf(value) === index))
    );

    loadStripe('pk_test_51PPm0ERrDFWhTqxPdSApEOv9Y5985Uz7bE0f2e1N34U4QijoSjc7jya1TRAxOtBlUZ8ATrdQasMPsm4w1SzqwUV500PpsRL9wp').then((stripe) => {
      this.stripe = stripe;
    });
  }

  onCountryChange(event: any) {
    this.selectedCountry = event.target.value;
    this.cities$ = this.shippingService.getShipping().pipe(
      map((shippingAddresses: ShippingAddress[]) => {
        const selectedCountryAddresses = shippingAddresses.filter(address => address.country === this.selectedCountry);
        return selectedCountryAddresses.map(address => ({ name: address.city, price: address.shipping_price }));
      })
    );
    this.selectedCity = null;
  }

  onCityChange(event: any) {
    const selectedCityName = event.target.value;
    this.cities$.pipe(
      map(cities => cities ? cities.find(city => city.name === selectedCityName) : null)
    ).subscribe(selectedCity => {
      if (selectedCity !== undefined) {
        this.selectedCity = selectedCity;
      }
    });
  }

  placeOrder() {
    this.cartItems$.subscribe(cartItems => {
      const lineItems = cartItems.map(item => ({
        price_data: {
          currency: 'rsd',
          product_data: {
            name: item.product.name,
          },
          unit_amount: item.product.price * 100, // Convert price to cents
        },
        quantity: item.quantity,
      }));

    this.http.post('https://localhost:7234/api/sportbasic/create-checkout-session', lineItems).subscribe(async (session: any) => {
      const result = await this.stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        console.error(result.error.message);
      }
    });
  });
}

  
}
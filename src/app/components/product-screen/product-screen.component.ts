import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product-screen',
  templateUrl: './product-screen.component.html',
  styleUrls: ['./product-screen.component.css']
})
export class ProductScreenComponent implements OnInit {

  @Input() product!: Product;
  shoeSizes: number[] = [];

 

  constructor(public cartService: CartService, private route: ActivatedRoute,
    private productService: ProductServiceService) {  for (let i = 36; i <= 47; i++) {
      this.shoeSizes.push(i);
    } }

  

  ngOnInit(): void {
    this.getProduct();
  
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(product => this.product = product);
  }

}

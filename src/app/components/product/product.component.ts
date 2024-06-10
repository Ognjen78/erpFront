import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  selectedGender: string = '';
  sortOrder: string = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 12;
  searchTerm: string = '';
  searchResults: Product[] = [];

  constructor(
    private productService: ProductServiceService,
     private route: ActivatedRoute,
      private router: Router,
      private cartService: CartService,
      private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      this.applyFilters();

      window.scrollTo(0,0);
    });
  }

  loadProducts(): void {
    this.productService.getProducts(this.currentPage, this.itemsPerPage).subscribe(data =>
      {
        this.products = data;
        this.categories = Array.from(new Set(this.products.map(p => p.category)));
        this.applyFilters();
      }
    )
  }

  onSortChange(event: any) {
    this.sortOrder = event.target.value;
    this.applyFilters();
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value;
    this.currentPage = 1;
    this.applyFilters();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: this.selectedCategory },
      queryParamsHandling: 'merge',
    });
  }

  onGenderChange(event: any) {
    this.selectedGender = event.target.value;
    this.currentPage = 1;
    this.applyFilters();
  }

  onSearchChange() {
    this.currentPage = 1; 
    this.applyFilters();
  }

  applyFilters() {
    let products = this.products;

    if (this.selectedCategory) {
      products = products.filter(p => p.category === this.selectedCategory);
    }

    if (this.selectedGender) {
      products = products.filter(p => p.gender === this.selectedGender);
    }

    if (this.searchTerm) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.sortOrder === 'asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      products.sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = products;
    
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadProducts();
    window.scrollTo(0, 0);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartService.getCart();
    this.snackBar.open('Proizvod je dodat u korpu!', 'Zatvori', {
      duration: 2000
    });
  }



  

}

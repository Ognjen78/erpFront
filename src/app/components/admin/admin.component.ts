import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderItem } from 'src/app/models/order-item';
import { Product } from 'src/app/models/product';
import { ShippingAddress } from 'src/app/models/shipping-address';
import { User} from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  products: Product[] = [];
  orders: Order[] = [];
  orderItems: OrderItem[] = [];
  shippingAddresses: ShippingAddress[] = [];

  newProduct: Product = { id_product: 0, name: '', brand: '', category: '', description: '', price: 0, stock: 0, imageUrl: '', gender: '' };
  newShippingAddress: ShippingAddress = { id_shipping: 0, country: '', city: '', shipping_price: 0 };
  isEditingProduct: boolean = false;
  isEditingShippingAddress: boolean = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadProducts();
    this.loadOrders();
    this.loadOrderItems();
    this.loadShippingAddresses();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe(users => this.users = users);
  }

  loadProducts() {
    this.adminService.getProducts().subscribe(products => this.products = products);
  }

  loadOrders() {
    this.adminService.getOrders().subscribe(orders => this.orders = orders);
  }

  loadOrderItems() {
    this.adminService.getOrderItems().subscribe(orderItems => this.orderItems = orderItems);
  }

  loadShippingAddresses() {
    this.adminService.getShippingAddresses().subscribe(shippingAddresses => this.shippingAddresses = shippingAddresses);
  }



  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }

  deleteShippingAddress(id: number) {
    if (confirm('Are you sure you want to delete this shipping address?')) {
      this.adminService.deleteShippingAddress(id).subscribe(() => this.loadShippingAddresses());
    }
  }


  deleteOrder(id: number) {
    this.adminService.deleteOrder(id).subscribe(() => this.loadOrders());
  }

  deleteOrderItem(id: number) {
    this.adminService.deleteOrderItem(id).subscribe(() => this.loadOrderItems());
  }

  

   
   saveProduct() {
    if (this.isEditingProduct) {
      this.adminService.updateProduct(this.newProduct).subscribe(() => {
        this.loadProducts();
        this.newProduct = { id_product: 0, name: '', brand: '', category: '', description: '', price: 0, stock: 0, imageUrl: '', gender: '' };
        this.isEditingProduct = false;
      });
    } else {
      this.adminService.addProduct(this.newProduct).subscribe(() => {
        this.loadProducts();
        this.newProduct = { id_product: 0, name: '', brand: '', category: '', description: '', price: 0, stock: 0, imageUrl: '', gender: '' };
      });
    }
  }

  editProduct(product: Product) {
    this.newProduct = { ...product };
    this.isEditingProduct = true;
  }

  
  saveShippingAddress() {
    if (this.isEditingShippingAddress) {
      this.adminService.updateShippingAddress(this.newShippingAddress).subscribe(() => {
        this.loadShippingAddresses();
        this.newShippingAddress = { id_shipping: 0, country: '', city: '', shipping_price: 0 };
        this.isEditingShippingAddress = false;
      });
    } else {
      this.adminService.addShippingAddress(this.newShippingAddress).subscribe(() => {
        this.loadShippingAddresses();
        this.newShippingAddress = { id_shipping: 0, country: '', city: '', shipping_price: 0 };
      });
    }
  }

  editShippingAddress(address: ShippingAddress) {
    this.newShippingAddress = { ...address };
    this.isEditingShippingAddress = true;
  }

}

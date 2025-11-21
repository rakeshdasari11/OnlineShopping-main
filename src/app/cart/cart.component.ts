import { Component, OnInit } from '@angular/core';
import { ApiAreaService } from '../services/api-area.service';
import { HttpHeaders } from '@angular/common/http';
import { ProductsAreaService } from '../services/products-area.service';
import { CartAreaService } from '../services/cart-area.service';
import { ToolsService } from '../services/tools.service';

@Component({
    selector: 'app-cart',
    imports: [],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
cart: any = null;

  constructor(private cartService: CartAreaService ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (data) => this.cart = data,
      error: () => this.cart = null,
    });
  }

  changeQuantity(productId: string, qty: number) {
    debugger
    if (qty <= 0) return;
let payload = 
    {
  "id": productId,
  "quantity": qty
}

    this.cartService.createCart(payload).subscribe(() => {
      this.loadCart();
    });
  }

  deleteItem(productId: string) {
    this.cartService.removeAll().subscribe(() => {
      this.loadCart();
    });
  }

  clearCart() {
    this.cartService.removeAll().subscribe(() => {
      this.cart = null;
    });
  }

  checkout() {
    this.cartService.checkOut().subscribe(() => {
      alert('Checkout successful!');
      this.cart = null;
    });
  }

  getProductImage(id: string) {
    //return this.cartService.getProductImage(id);
  }

  getProductName(id: string) {
  //  return this.cartService.getProductName(id);
  }

}

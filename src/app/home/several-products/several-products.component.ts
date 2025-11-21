// several-products.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { AllProductArea } from '../../../interfaces/all-product-area';
import { ProductsAreaService } from '../../services/products-area.service';
import { CartAreaService } from '../../services/cart-area.service';
import { CookieService } from 'ngx-cookie-service';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-several-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './several-products.component.html',
  styleUrl: './several-products.component.css',
})
export class SeveralProductsComponent implements OnInit {
  productList: Product[] = [];
  isLoading = false;

  constructor(private service: ProductsAreaService,
  private  cartService : CartAreaService,
   private _cookie: CookieService,
    private tools: ToolsService
  ) {}

  ngOnInit(): void {
    this.showCards();
  }

  showCards() {
    this.isLoading = true;
    this.service.getCardsforHome().subscribe({
      next: (data: AllProductArea) => {
        this.productList = data.products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      },
    });
  }

  addToCart(product: Product) {
    debugger
    console.log('Added to cart:', product);
    // Add your cart logic here
    const cookieUserInfo = JSON.parse(this._cookie.get('userInfo'));
    if (!this._cookie.get('user')) {
    // open sign-in modal or navigate to /login
    this.tools.isSignedIn.next(true);
    return;
  }
debugger
  cookieUserInfo
  let payload = 
    {
  "id": product._id,
  "quantity": 1
}

  // Try to update cart (if exists), otherwise create
  this.cartService.createCart(payload).subscribe(res => {
    if (!res) { // if update returned null (no cart), create one
      this.cartService.createCart(product._id, ).subscribe();
    }
  });
  }
}
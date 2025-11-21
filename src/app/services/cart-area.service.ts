import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartAreaService {

   public cart$ = new BehaviorSubject<any>(null);
  public itemCount$ = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) { }

  getCart () {
    return this.http.get("https://api.everrest.educata.dev/shop/cart").pipe(
        tap(cart => this.setCart(cart)),
        catchError(err => { console.error(err); return of(null); })
      )
  }

  createCart(body: any) {
    // this.setCart
    return this.http.post("https://api.everrest.educata.dev/shop/cart/product", body).pipe(
        tap(cart => this.setCart(cart)),
        catchError(err => { console.error(err); return of(null); })
      )
  }


  addtoCart(body: any,) {
    return this.http.patch("https://api.everrest.educata.dev/shop/cart/product", body )
  }



  deleteProduct(body: any) {
    return this.http.delete("https://api.everrest.educata.dev/shop/cart/product", {body: body})
  }

  removeAll() {
    return this.http.delete("https://api.everrest.educata.dev/shop/cart")
  }

  checkOut() {
    return this.http.post("https://api.everrest.educata.dev/shop/cart/checkout", "")
  }

   private setCart(cart: any) {
    debugger
    this.cart$.next(cart);
    const count = cart?.total?.quantity ?? 0;
    this.itemCount$.next(count);
  }
}

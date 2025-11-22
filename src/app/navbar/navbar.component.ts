// navbar.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ScrollingDirective } from '../../directives/scrolling.directive';
import { ToolsService } from '../services/tools.service';
import { CookieService } from 'ngx-cookie-service';
import { CartAreaService } from '../services/cart-area.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SignInComponent,
    SignUpComponent,
    ScrollingDirective,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isSignShow = false;
  isRegisterShow = false;
  isMobileMenuOpen = false;
  isScrolled = false;
  public cartCount = 0;

  userName = '';
  userImg = '';

  constructor(
    private _cookie: CookieService,
    private tools: ToolsService,
    private cartService : CartAreaService
  ) {}

  ngOnInit() {
     this.cartService.itemCount$.subscribe(cnt => this.cartCount = cnt);
    this.profileInfoNav();

    this.tools.isSignedIn.subscribe((info: boolean) => {
      this.isSignShow = info;
    });

    this.tools.isRegistered.subscribe((info: boolean) => {
      this.isRegisterShow = info;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  profileInfoNav() {
    this.tools.userNavbarInfo.subscribe((data: any) => {
      setTimeout(() => {
        if (data?.avatar || this._cookie.get('userInfo')) {
          try {
            const cookieUserInfo = JSON.parse(this._cookie.get('userInfo'));
            this.isLoggedIn = true;
            this.userImg = data?.avatar || cookieUserInfo?.avatar;
            this.userName = data?.firstName || cookieUserInfo?.firstName;
          } catch (e) {
            this.isLoggedIn = false;
          }
        } else {
          this.isLoggedIn = false;
        }
      }, 0);
    });
  }

  signInForm() {
    this.isMobileMenuOpen = false;
    this.tools.isSignedIn.next(true);
  }

  showRegister() {
    this.isMobileMenuOpen = false;
    this.tools.isSignedIn.next(false);
    this.tools.isRegistered.next(true);
  }

  closeForm(close: boolean) {
    this.isSignShow = close;
  }

  closeRegister(close: boolean) {
    this.isRegisterShow = close;
  }

  loggedIn(logg: boolean) {
    this.isLoggedIn = logg;
  }

  signOut() {
    this._cookie.deleteAll();
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.userName = '';
    this.userImg = '';
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
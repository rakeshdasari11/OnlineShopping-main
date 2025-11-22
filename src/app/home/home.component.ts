// home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { ApiAreaService } from '../services/api-area.service';
import { shopCards } from './shopCardData';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BannerComponent,
    ShopComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  shopCards: any[] = [];

  constructor(private api: ApiAreaService) {}

  ngOnInit(): void {
    this.shopCards = shopCards;
  }
}
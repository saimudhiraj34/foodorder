import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart: Cart = {
    items: [],
    totalPrice: 0
  };  // Initialize with empty items array

  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {}

  removeFromCart(cartItem: CartItem) {
    if (cartItem.food?.id) {
      this.cartService.removeFromCart(cartItem.food.id);
    }
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString, 10);
    if (!isNaN(quantity) && cartItem.food?.id) {
      this.cartService.changeQuantity(cartItem.food.id, quantity);
    }
  }
}

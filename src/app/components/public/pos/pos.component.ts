import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { NotifyService } from '../../../services/notify/notify.service';
import { FirebaseService } from '../../../services/firebase/firebase.service';
//import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  categories : any;
  products : any;
  content: any = null;
  basket: any = [];
  backup : any = [];
  cartTotal: number = 0;
  cartNumItems: number;
  storename: String = 'Karekas';

  constructor(
    private firestore : FirebaseService,
    private notify : NotifyService
  ) { }

  ngOnInit() {

    this.firestore.getProducts().subscribe((data) => {
      this.products = data;
    })
    
   this.firestore.getCategories().subscribe((data) => {
      this.categories = data;
    })
    
  }
  
  productOption(){
    //alert(2);
  }

  show(item){
    this.content = item.content;
  }

  panier(a){
    this.productOption();
    if(this.basket == '' || this.basket == null){
      a.quantity = 1;
      this.backup.push(a);
      this.basket.push(a);
    } else {
      var isPresent = this.basket.some(function (el) { return el.name === a.name });
      
      if(isPresent == false){
        a.quantity = 1;
        this.backup.push(a);
        this.basket.push(a);
      }else{
        a.quantity += 1;
      }

    }
    this.calculateTotal();
  }

  /*add(x){
    x.quantity = x.quantity + 1;
    var isp = this.backup.some(function (el) {
      if (el.name === x.name ){
        var p = el.price;
        x.price = p * x.quantity;
        return x.price;
      }
    });

    console.log(isp);
    
  }*/

  add(x) {
    // If the item already exists, add 1 to quantity
    if (this.basket.includes(x)) {
      this.basket[this.basket.indexOf(x)].quantity += 1;
    } else {
      this.basket.push(x);
    }
    this.calculateTotal();
  }

  reduce(x) {
    // Check if last item, if so, use remove method
    if (this.basket[this.basket.indexOf(x)].quantity === 1) {
      this.remove(x);
    } else {
      this.basket[this.basket.indexOf(x)].quantity = this.basket[this.basket.indexOf(x)].quantity - 1;
    }
    this.calculateTotal();
  }

  remove(x) {
    // Check if item is in array
    if (this.basket.includes(x)) {
      // Splice the element out of the array
      const index = this.basket.indexOf(x);
      if (index > -1) {
        // Set item quantity back to 1 (thus when readded, quantity isn't 0)
        this.basket[this.basket.indexOf(x)].quantity = 1;
        this.basket.splice(index, 1);
      }
    }
    this.calculateTotal();
  }

  calculateTotal() {
    let total = 0;
    let cartitems = 0;
    // Multiply item price by item quantity, add to total
    this.basket.forEach(function (x) {
      total += (x.price * x.quantity);
      cartitems += x.quantity;
    });
    this.cartTotal = total;
    this.cartNumItems = cartitems;
  }

  // Remove all items from cart
  clearCart() {
    // Reduce back to initial quantity (1 vs 0 for re-add)
    this.basket.forEach(function (x) {
      x.quantity = 1;
    });
    // Empty local ticket variable then sync
    this.basket = [];
    this.calculateTotal();
  }

  checkout() {
    if (this.basket.length > 0) {
      //this.cinetpay.tr(this.cartTotal);
    } else {
      Swal.fire("Error", "Votre panier est vide", "error");
    }
  }


  

}

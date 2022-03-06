import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/entity/cart';
import { Product } from 'src/app/entity/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  input:number;
  uid:string
  cartTotal=0;
  date:Date
  constructor(private cartService:CartService,
    private router:Router,
    public datePipe:DatePipe) { }
  carts:Array<Cart>
  cartLength:number
  date2:Date
  buy:boolean=true
  ngOnInit(): void {
    this.date=new Date();
    
    let date22:any = this.datePipe.transform(this.date,"yyyy-MM-dd")
    console.log(date22);
    this.date2 =date22;
    console.log(this.date2)
    this.cartLength=0;
    if(sessionStorage.getItem("uid")!=null){
      this.uid = JSON.parse(sessionStorage.getItem("uid"));
      this.getCart();
    }
  }
  getCart(){
    this.cartService.getCartItems(this.uid).subscribe(Response=>{
      this.carts=Response;
      this.carts.forEach(e=>{
        if(e.product.state==0){
          this.buy=false
        }
      })
      this.cartLength = this.carts.length;
      this.getCartTotal(this.carts);
      console.log(this.carts);
      this.carts.forEach(e=>{
        console.log(e.product.special_from_time)
        console.log(e.product.special_to_time)
      })
    },(error)=>{
      console.log(error);
    })
  }
  plusCart(pid:string){
    this.cartService.plusCart(this.uid,pid).subscribe(Response=>{
      console.log(Response);
      this.reloadCurrentRoute();
    })
  }
  minusCart(pid:string){
    this.cartService.minusCart(this.uid,pid).subscribe(Response=>{
      console.log(Response);
      this.reloadCurrentRoute();
    })
  }
  deleteCartItem(product:Product){
    this.cartService.deleteCartItem(this.uid,product.productID).subscribe(Response=>{
      console.log(Response);
      this.reloadCurrentRoute();
    })
  }
  updateQuanCart(product:Product,soluong:number){
    this.cartService.UpdateQuanCart(this.uid,product.productID,soluong).subscribe(Response=>{
      console.log(Response);
      this.reloadCurrentRoute();
    })
  }
  getCartTotal(carts:Array<Cart>){
    carts.forEach(data => {
      let date2 =new Date();
      let date22:any = this.datePipe.transform(date2,"yyyy-MM-dd")
      if(data.product.percent_discount>0&& date22<data.product.special_to_time&&date22>data.product.special_from_time){
        this.cartTotal+= Number(data.product.price*((100-data.product.percent_discount)/100)*data.soluong)
        console.log(this.cartTotal)
       
      }else{

        this.cartTotal+= Number(data.product.price*data.soluong)
        console.log(this.cartTotal)
       }
    });
  }
 
  public onChange(event:Event,cart:Cart): void {
    const input = event.target as HTMLInputElement;
    this.input = Number(input.value);
    console.log(input.value);
    console.log(cart);
    if(cart.soluong>this.input){
        this.updateQuanCart(cart.product,this.input);
    }
    if(cart.soluong<this.input&&(cart.product.inventory[0].quantity-this.input>0)){
        this.updateQuanCart(cart.product,this.input);
    }
    
    }
    reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
          console.log(currentUrl);
      });
    }
    goCheckOut(){
      this.router.navigate(['/web/checkout'])
    }
}

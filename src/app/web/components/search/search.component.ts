
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/entity/cart';
import { Product } from 'src/app/entity/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  s:String;
  products: Array<Product>;
  constructor(
    private actRoute: ActivatedRoute,
    private productService: ProductService,
    private route :Router,
    private cartService:CartService
  ) { }
  uid:string
    carts:Array<Cart>=[]
    cartSize:number=0
  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(
      data=>{
        const key = data.keyword;
        this.getProductByLikeTensp(key);
        if(sessionStorage.getItem("uid")!=null){
          this.uid = JSON.parse(sessionStorage.getItem("uid"))
          this.getCart();
        }
      })
      
      
  }
  getProductByLikeTensp(tensp:String){
    this.productService.getProductByLikeTensp(tensp).subscribe(
      Response =>{ 
        
        this.products = Response
        this.products = this.products.filter(e=>e.state!==0);
      }
    )
  }
  goDetail(product:Product){
    this.actRoute.queryParams.subscribe( params  =>{
      const id = product.productID;
      this.route.navigate(['/web/product-detail'],{queryParams:{id}})
    })

  }
  getCart(){
    this.cartService.getCartItems(this.uid).subscribe(Response=>{
      this.carts=Response;
      this.cartSize = this.carts.length;
      console.log(this.carts);
      console.log(Response);
    },(error)=>{
      console.log(error);
    })
  }
  addTocart(product:Product){
    let pid =product.productID
    console.log(pid)
    let cart = new Cart();
    cart = this.carts.find(x=>x.product.productID==pid && x.userDetail.id == this.uid)
    
    if(this.uid!=null && cart==null){
      console.log(this.uid)
      this.cartService.addToCart(this.uid,pid).subscribe(Response=>{
        alert("add to cart success")
        console.log(Response);
    },)
    }else{
      alert("this item already exist in your cart");
    }

  }
}

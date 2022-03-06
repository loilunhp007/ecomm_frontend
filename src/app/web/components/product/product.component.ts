import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/entity/cart';
import { Product } from 'src/app/entity/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products:Array<Product>=[]
  productID:string;
  product:Product;
  p:number=1
  nameFilter 
  priceFilter
  constructor(
    private productService:ProductService,
    private Actroute: ActivatedRoute,
    private router:Router,
    private actRoute:ActivatedRoute,
    private cartService:CartService,
    public datepipe:DatePipe,
    
    ) { }
    date2:Date
    uid:string
    carts:Array<Cart>=[]
    cartSize:number=0
  ngOnInit(): void {
    let date = new Date();
    let date22:any = this.datepipe.transform(date,"yyyy-MM-dd")
    this.date2 = date22
    this.actRoute.queryParams.subscribe(
      data=>{
        const key = data.cate;
        if(key!=null){
          this.getAllProductsByCate(key)
        }else{
          this.getAllProducts();
        }
        if(sessionStorage.getItem("uid")!=null){
          this.uid = JSON.parse(sessionStorage.getItem("uid"))
          this.getCart();
        }
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
  
  getAllProducts(){
    this.productService.getAllProducts().subscribe(Response =>{
      let temp:Array<Product> =Response 
      temp.forEach(e=>{
        if(e.state==1){
          this.products.push(e);
        }
      })
        console.log(this.products);
    })
  }
  goDetail(product2:Product){
    this.Actroute.queryParams.subscribe( params  =>{
      const id = product2.productID;
      this.router.navigate(['/web/product-detail'],{queryParams:{id}})
    })
  }
  getAllProductsByCate(cateID:number){
    this.productService.getProductByCate(cateID).subscribe(Response=>{
      this.products = Response;
      this.products = this.products.filter(e=>e.state!== 0);
      console.log(Response)
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

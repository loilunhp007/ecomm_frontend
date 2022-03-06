import { DatePipe } from '@angular/common';
import { Component, OnInit, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/entity/cart';
import { Product } from 'src/app/entity/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  text:string
  img:String
  percent_discounts=[]
  products:Array<Product>
  hotproducts:Array<Product> = [];
  uid:string
  carts:Array<Cart>
  cartSize:number=0
  date2:Date;
  constructor(private productService:ProductService,
    private cartService:CartService,
    private Actroute:ActivatedRoute,private route:Router,
    public datepipe:DatePipe) { }
    flag:boolean=false;
    c:boolean=true
    c2:boolean=true
  ngOnInit(): void {
    let date = new Date();
    let date22:any = this.datepipe.transform(date,"yyyy-MM-dd")
    this.date2 = date22
    this.getProduct();
    
    if(sessionStorage.getItem("uid")!=null){
      this.uid = JSON.parse(sessionStorage.getItem("uid"))
      this.getCart();
    }
    setTimeout(() => {
      this.sampleMethodCall()
      this.sampleMethodCall1() 
   }, 2000);
   
    
   
  }
  getProduct(){
    this.productService.getProducts().subscribe(Response =>{
        this.products = Response.slice().reverse();
        this.products = this.products.filter(e=>e.state==1);
        this.fetchDiscountProduct();
        console.log(this.products);
    },(error)=>{
      alert("empty products")
    })
  }
  fetchDiscountProduct(){
    if(this.products!=null){
      this.products.filter(e=>e.state==1);
      this.products.forEach( (e)=>{
        if(e.percent_discount >= 20){
          this.hotproducts.push(e); 
        }
        this.hotproducts.filter(e=>e.state==1);
        
      });
    }
    console.log(this.hotproducts)
    
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
  public sampleMethodCall() {
    
    if(this.c2==true){
      document.getElementById("next_featured").click();
      console.log("click 1")
    }
    this.c2=false;
     console.log(this.c2)
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
    
    public sampleMethodCall1() {
    
        if(this.c==true){
          document.getElementById("next_hot").click(); 
          console.log("click 2")
        }
        this.c=false;
        console.log(this.c)
      }

      goDetail(event,product:Product){
        event.preventDefault();
        this.Actroute.queryParams.subscribe( params  =>{
          const id = product.productID;
          this.route.navigate(['/web/product-detail'],{queryParams:{id}})
        })
        return false;
      }
}

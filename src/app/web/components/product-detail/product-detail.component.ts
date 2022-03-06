import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/entity/cart';
import { Product } from 'src/app/entity/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product ;
  s:String;
  i:number=0
  constructor(
    private actroute: ActivatedRoute,
    private productService: ProductService,
    private router:Router,
    public datepipe:DatePipe,
    private cartService:CartService
    //private router:Router,
    ) { }
    cart:Cart
    date:Date
    uid:string
    carts:Array<Cart>
    cartSize:number=0
    products:Array<Product>
    hotproducts:Array<Product>
    c:boolean=true
    images:any
    imageslength:number=0
    quantity:number
  ngOnInit(): void {
    let date2:any= this.datepipe.transform(new Date(),"yyyy-MM-dd")
    this.date = date2;
    this.product=new Product();
    
    if(sessionStorage.getItem("uid")!=null){
      this.uid = JSON.parse(sessionStorage.getItem("uid"))
      this.getCart();
    }
    this.getProduct();
    //const routeParams = this.route.snapshot.paramMap;
    //const productIdFromRoute = Number(routeParams.get('productId'));
    //this.productService.findProductByID(product => product.id === productIdFromRoute);
    this.actroute.queryParams.subscribe(data =>{
      this.s = data.id
      console.log(data)
      this.getProductByID(this.s);
      
    })
    setTimeout(() => {
      this.sampleMethodCall()
   }, 2000);
  }
  getProductByID(masp:String){
    this.productService.getProductByID(masp).subscribe(
      Response =>{ this.product=Response
          this.images=this.product.images[0];
          this.imageslength = this.product.images.length;
          this.quantity = this.product.inventory[0].quantity;
          if(this.i<1){
            //window.location.reload();
          }
          this.i++;
        console.log(this.product)
      
     
    })
  }
  addTocart(product:Product){
    let pid =product.productID
    console.log(pid)
    let cart = new Cart();
    if(this.uid==null){
      alert("vui long dang nhap truoc")
    }else{

    
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
  getProduct(){
    this.productService.getProducts().subscribe(Response =>{
        this.products = Response;
        console.log(this.products);
        this.fetchDiscountProduct();
    },(error)=>{
      alert("empty products")
    })
  }
  fetchDiscountProduct(){
    this.hotproducts = []
    if(this.products!=null){
      this.products.forEach( e=>{
        if(e.percent_discount >= 20){
          this.hotproducts.push(e); 
        }
      });
    }
    console.log(this.hotproducts)
    
  }
  public sampleMethodCall() {
    
    if(this.c==true){
      document.getElementById("next_hot").click(); 
      console.log("click 2")
    }
    this.c=false;
    console.log(this.c)
  }
}


import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/entity/category';
import { Product } from 'src/app/entity/product';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/entity/cart';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { UserDetail } from 'src/app/entity/user-detail';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']

})

export class MenuComponent implements OnInit {
  formSearch = this.formBuilder.group({
    searchValue:[''],
  });
    searchText;
  categories:Array<Category>
  carts:Array<Cart>
  cartTotal=0;
  cartLength:number
  uid:string
  img:string
  isLogged = false;
  userdetail:UserDetail
  date2:Date
  constructor(private categoryService:CategoryService,
    private cartService:CartService,
    private router:Router, 
    private formBuilder:FormBuilder,
    private loginService:LoginService,
    private userService:UserService,
    public datepipe:DatePipe) { 
    }

  ngOnInit(): void {
    let date = new Date();
    let date22:any = this.datepipe.transform(date,"yyyy-MM-dd")
    this.date2 = date22
    this.userdetail = new UserDetail();
    if(sessionStorage.getItem("uid")!=null){
      this.uid=JSON.parse(sessionStorage.getItem("uid"));
      this.getCart();
      this.getUserDetail(this.uid);
    }
    
    this.getCategories();
  }
  getCategories(){
    this.categoryService.getCategories().subscribe(Response=>{
      this.categories = Response;
      this.categories = this.categories.filter(e=>e.trangthai==1)
      console.log(Response)
    },(error)=>{
      console.log(error)
    });
    
  }
  getUserDetail(id:string){
    this.userService.getUserByID(id).subscribe(Response=>{
      this.userdetail=Response;
    })
  }
  getCart(){
    this.cartService.getCartItems(this.uid).subscribe(Response=>{
      this.carts=Response;
      this.cartLength = this.carts.length;
      this.getCartTotal(this.carts);
      console.log(this.carts);
      console.log(Response);
    },(error)=>{
      console.log(error);
    })
  }
  goSearch(){ 
      const keyword = this.getFormcontrols().searchValue.value ;
      this.router.navigate(['/web/search'],{queryParams:{keyword}})
  }
  getFormcontrols(){
    return this.formSearch.controls;
  }
  getCartTotal(carts:Array<Cart>){
    carts.forEach(data => {
      let date2 =new Date();
      let date22:any = this.datepipe.transform(date2,"yyyy-MM-dd")
      if(data.product.percent_discount>0&& date22<data.product.special_to_time&&date22>data.product.special_from_time){
        this.cartTotal+= Number(data.product.price*((100-data.product.percent_discount)/100)*data.soluong)
        console.log(this.cartTotal)
       
      }else{

        this.cartTotal+= Number(data.product.price*data.soluong)
        console.log(this.cartTotal)
       }
    });
  }
  isLoggedIn(){
    this.isLogged = this.loginService.isLogged();
    return this.isLogged;
  }
  logout(){
    this.isLogged = this.loginService.logOut();
    return this.router.navigate(["/web/login"]);
  }
  findProductByCate(category:Category){
    let cate:number = category.cateID;
    this.router.navigate(['/web/product'],{queryParams:{cate}})
  }
}

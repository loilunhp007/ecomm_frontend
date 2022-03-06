import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/entity/cart';
import { Order } from 'src/app/entity/order';
import { OrderDetail } from 'src/app/entity/order-detail';
import { PaymentMethod } from 'src/app/entity/paymentMethod';
import { Product } from 'src/app/entity/product';
import { Transport } from 'src/app/entity/transport';
import { UserDetail } from 'src/app/entity/user-detail';
import { CartService } from 'src/app/services/cart.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentserviceService } from 'src/app/services/paymentservice.service';
import { ProductService } from 'src/app/services/product.service';
import { TransportService } from 'src/app/services/transport.service';
import { UserService } from 'src/app/services/user.service';
declare var google;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  gps1:any
  gps2:any
  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private cartService:CartService,
    private orderService:OrderService,
    private orderDetailService:OrderDetailService,
    private paymentService:PaymentserviceService,
    private transportService:TransportService,
    private productService:ProductService,
    private router:Router,
    public datepipe: DatePipe
    ) { }
    userdetail:UserDetail
  userForm= this.formBuilder.group({
    firstname:['',Validators.required],
    lastname:['',Validators.required],
    email:['',Validators.required],
    tel:['',Validators.required],
    address:['',Validators.required],
    payment:[''],
    shipping:['']
  })
  paymentID=1;
  shippingID=1;
  uid:string
  payment:PaymentMethod
  carts:Array<Cart>
  payments:Array<PaymentMethod>
  tranports:Array<Transport>
  cartTotal=0;
  ResponseOrder:Order
  distance=0;
  fee=0;
  Cartlength=0
  previosPrice=0;
  date22:any
  buy:boolean=true
  ngOnInit(): void {
    this.getPaymentmethod();
    this.getTransport();
    let date =new Date();
     this.date22 = this.datepipe.transform(date,"yyyy-MM-dd");
    if(sessionStorage.getItem("uid")!=null){
      this.uid= JSON.parse(sessionStorage.getItem('uid'));
      console.log(this.uid)
      this.getUserDetail(this.uid);
      this.getCart();
    }

  }
  displayUserInfo(){
    this.firstname.setValue(this.userdetail.firstname);
    this.lastname.setValue(this.userdetail.lastname);
    this.email.setValue(this.userdetail.gmail);
    this.tel.setValue(this.userdetail.phone);
    this.address.setValue(this.userdetail.address);
  }
  getPaymentmethod(){
    this.paymentService.getAllPaymentMethod().subscribe(Response=>{
      this.payments=Response;
      this.payment =this.payments.find(x=>x.payment_id==this.paymentID)
    });
  }
  getTransport(){
    this.transportService.getShipping().subscribe(Response=>{
      this.tranports = Response;
     
      
    })
  }
  get firstname(){
    return this.userForm.get("firstname");
  }
  get lastname(){
    return this.userForm.get("lastname");
  }
  get email(){
    return this.userForm.get("email");
  }
  get tel(){
    return this.userForm.get("tel");
  }
  get address(){
    return this.userForm.get("address");
  }


 getUserDetail(id:string){
    this.userService.getUserByID(id).subscribe(Response=>{
      this.userdetail=Response;
      this.displayUserInfo();
      console.log(Response)
    })
  }
  getCart(){
    this.cartService.getCartItems(this.uid).subscribe(Response=>{
      this.carts=Response;
      this.carts.forEach(e=>{
        if(e.product.state==0){
          this.buy=false;
        }
      })
      this.Cartlength=this.carts.length;
      this.getCartTotal(this.carts);
      console.log(this.carts);
    },(error)=>{
      console.log(error);
    })
  }
  getCartTotal(carts:Array<Cart>){
    this.fee= this.tranports.find(x=>x.tid==this.shippingID).fee;
    carts.forEach(data => {
     
      if(data.product.percent_discount>0&& this.date22<data.product.special_to_time&&this.date22>data.product.special_from_time){
        this.cartTotal+= Number(data.product.price*((100-data.product.percent_discount)/100)*data.soluong)
        console.log(this.cartTotal)
        this.previosPrice+=Number(data.product.price*((100-data.product.percent_discount)/100)*data.soluong)
      }else{
        this.previosPrice+=  Number(data.product.price*data.soluong)
        this.cartTotal+= Number(data.product.price*data.soluong)
        console.log(this.cartTotal)
       }
    });
    this.cartTotal+=this.fee
  }
  //create Order
  createOrder(){
    if(confirm("Bạn chắc chắn muốn đặt hàng ?")){

         this.cartService.getCartItems(this.uid).subscribe(
           Response2=>{
             let checkQuan:boolean=true;
             this.carts=Response2;
             this.carts.forEach(e=>{
               if(e.product.inventory[0].quantity < e.soluong){
                 checkQuan=false;
               }
             })
             if(checkQuan){
               let order = new Order()
               let date = new Date();
             let day=date.getDate();
             console.log(date);
             let date2=this.datepipe.transform(date,"yyyy-MM-dd")
               const month = date.getMonth()+1;
               const year = date.getFullYear();
               let cartSize =this.carts.length;
               this.tranports.find(x=>x.tid==this.shippingID)
               order.startTime = date2;
               order.total =Number(this.cartTotal);
               order.state= 1
               order.userDetail=this.userdetail;
               order.paymentMethod = this.payment;
               console.log(order)
               this.orderService.addOrder(order).subscribe(Response22=>{
                 console.log(Response22);
                  this.ResponseOrder = Response22;
                  this.carts.forEach(data=>{
                    let orderDetail = new OrderDetail()
                    orderDetail.transport = this.tranports.find(x=>x.tid==this.shippingID)
                    orderDetail.quantity=data.soluong
                    orderDetail.orderID= this.ResponseOrder.orderID+''                     
                    orderDetail.price = data.product.price
                    orderDetail.productID = data.product.productID
      
                    if(data.product.percent_discount>0&& this.date22<data.product.special_to_time&&this.date22>data.product.special_from_time){
                     orderDetail.totalItem= Number(data.product.price*((100-data.product.percent_discount)/100)*data.soluong)
                    }else{
                      orderDetail.totalItem = Number(data.product.price*data.soluong)
                    }
                    let quan =  data.product.inventory[0].quantity-data.soluong
                   
                    //orderDetail.transport= this.shippingFee.value
                  //  orderDetail. = Number(product2.gia*data.soluong)+Number(this.Shipping)
                    orderDetail.deliveryAddress = "273 An Duong Vuong, Quan 5,Thanh Pho Ho Chi Minh"
                    orderDetail.destination = this.address.value
                     this.orderDetailService.addOrderDetail(orderDetail).subscribe(
                                    Response5=>{
                                      
                                      this.productService.updateInventory(data.product.productID,quan).subscribe(
                                        Response6=>{
                                          this.cartService.deleteCart(this.uid).subscribe(
                                            Response7=>{
                                                  this.reloadCurrentRoute();
                                           },(error)=>{
                                              this.reloadCurrentRoute();
                                            }
                                          );
                                        }
                                      )
                                       
                                  
                                    },(error)=>{
                                            
                                          }
    
                                ),(error)=>{
                                            
                                }
                                       
                  })
               },(error)=>{
                alert("đặt hàng thành công"),
                console.log(error);
               })
                 
                   alert("đặt hàng thành công")
                 
             }else{
               alert("Có lỗi xảy ra vui lòng thử lại sau")
           }      
          },(error)=>{
            alert("Có sự cố xảy ra vui lòng thử lại sau")
          }
          )
         
    }

   }
   paymentOnchange(event){
    this.paymentID = event.target.value;
    this.payment = this.payments.find(x=>x.payment_id==this.paymentID)
   }
   shippingOnchange(event){
    this.shippingID = event.target.value;
    this.fee= this.tranports.find(x=>x.tid==this.shippingID).fee*this.Cartlength;
    this.cartTotal=0;
    this.previosPrice=0;
    this.getCartTotal(this.carts);
    console.log(this.tranports.find(x=>x.tid==this.shippingID).fee)
   }
  calculating(address1:String,address2:string){
    let speed = 20
    this.orderDetailService.getFromAddress(address1).subscribe(
      Response=>{
        let data1 = Response.results[0].geometry.lat;
        let num = data1    
        let data2 = Response.results[0].geometry.lng;
        let num2= data2
        this.gps1 = new google.maps.LatLng(num,num2);
        this.orderDetailService.getFromAddress(address2).subscribe(
          Response2=>{
            let data3 = Response2.results[0].geometry.lat;
            let data4 = Response2.results[0].geometry.lng;
            let num = data3
            let num2= data4
           this.gps2 = new google.maps.LatLng(num,num2);
           var distance = google.maps.geometry.spherical.computeDistanceBetween(this.gps1,this.gps2)
           this.distance =Math.floor(Number(distance));
            

          }
        )
      }
    )
   
    
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }
}

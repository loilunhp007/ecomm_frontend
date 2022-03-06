import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/entity/order';
import { OrderDetail } from 'src/app/entity/order-detail';
import { Product } from 'src/app/entity/product';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-ql-donhang',
  templateUrl: './ql-donhang.component.html',
  styleUrls: ['./../../../../assets/admin/css/styles.css']
})
export class QlDonhangComponent implements OnInit {

  constructor(private orderService:OrderService,
    private route:Router,
    private actRouter:ActivatedRoute,
    private productService:ProductService,
    private orderDetailService:OrderDetailService,
    public datepipe:DatePipe) { }
    orderdetails:Array<OrderDetail>
    orders:Array<Order>
    p:number=1
    isToggle:boolean=true
    faTrash=faTrash
    time1:Date = new Date("2020-01-01")
    time2:Date = new Date("2021-01-01")
    selected:number=1
  ngOnInit(): void {
    this.getAllOrder()
  }
  getAllOrder(){
    this.orderService.getAllOrder().subscribe(
      Response=>{
        this.orders=Response.slice().reverse();
        console.log(this.orders);}
    )
  }
  updateOrder(order:Order){
    let ss = order.orderID+''
    if(order.state == 1){
    this.orderService.updateOrderStatus(ss,2).subscribe(
      Response=>{
        let order2 = new Order(); 
        order2 = Response
        this.reloadCurrentRoute();
      }
    );
    }
    if(order.state == 2){
    this.orderService.updateOrderStatus(ss,3).subscribe(
      Response=>{
        let order2 = new Order(); 
        order2 = Response
        this.reloadCurrentRoute();
      })
    }
    if(order.state == 3){
      this.orderService.updateOrderStatus(ss,4).subscribe(
        Response=>{
          let order2 = new Order(); 
          order2 = Response
          this.orderDetailService.updateOrderDetail

          this.reloadCurrentRoute();
        })
      }
      
  }
  updateOrderCancel(order:Order){
    this.orderService.updateOrderStatus(order.orderID,0).subscribe(
      Response=>{
        let order2 = new Order(); 
        order2 = Response
        this.orderDetailService.getOrderDetail(order.orderID).subscribe(
          Response2=>{
            let orderDetail =new OrderDetail();
            orderDetail=Response2[0]
            console.log(orderDetail)
            let sss = orderDetail.productID+''
            console.log(sss)
    

            
          
          }
        )

      }
    );
    }
  goDetail(order:Order){
    this.actRouter.queryParams.subscribe(
      params=>{
        const id=order.orderID;
        this.route.navigate(['admin','orderdetail'],{queryParams: {id}})
      }
    )
  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.route.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }
  getOrderDetail(order:Order){
    this.orderDetailService.getOrderDetail(order.orderID).subscribe(Response=>{
      this.orderdetails = Response;
      console.log(this.orderdetails)
    })
  }
  Search(date1:Date,date2:Date,state:number){
    this.orderService.getAllOrder().subscribe(
      Response=>{
        let tmps :Array<Order>  = Response;
        this.orders = []
        tmps.forEach(e=>{
          let d1:any = this.datepipe.transform(e.startTime,"yyyy-MM-dd")
         
          if(d1 >= date1 && d1<= date2 && e.state==state){
              this.orders.push(e);
          }
        })
        console.log(this.orders);}
    )
  }
  public popup_themsp(){
    
    this.isToggle = !this.isToggle
  
  console.log(this.isToggle);
}
  findOrder(){
    if(this.selected==5){
      this.getAllOrder();
    }else{
      this.Search(this.time1,this.time2,this.selected)
    }
  }
  tinhtrang(event){
    this.selected = event.target.value
  }
}

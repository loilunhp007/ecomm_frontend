import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail } from '../entity/order-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private httpClient:HttpClient) { }
  getOrderDetail(orderID:string):Observable<any>{
    return this.httpClient.get<OrderDetail>('https://be-ecommerce-2.herokuapp.com/orderdetail/get/'+orderID);
  }
  addOrderDetail(orderDetail:OrderDetail):Observable<any>{
    return this.httpClient.post<OrderDetail>('https://be-ecommerce-2.herokuapp.com/orderdetail/add',orderDetail);
  }
  updateOrderDetail(orderDetail:OrderDetail):Observable<any>{
    return this.httpClient.put<OrderDetail>('https://be-ecommerce-2.herokuapp.com/orderdetail/put',orderDetail);
  }
  ThongKeSP(thang:number,state:number):Observable<any>{
    return this.httpClient.get<[]>('https://be-ecommerce-2.herokuapp.com/orderdetail/get/thongkesoluong/'+thang+"/"+state);
  }
  thongKeDoanhthu(thang):Observable<any>{
    return this.httpClient.get<[]>('https://be-ecommerce-2.herokuapp.com/orderdetail/get/thongkedoanhthu/'+thang);
  } 
  thongkengay(ngay:string,state:number){
    return this.httpClient.get<[]>('https://be-ecommerce-2.herokuapp.com/orderdetail/get/thongkengay/'+ngay+'/'+state);
  }
  getFromAddress(address:String):Observable<any>{
    return this.httpClient.get('https://api.opencagedata.com/geocode/v1/json?q='+address+'&key=d38ba382c7434d7d91669d2e9e112c4c');
  }
}

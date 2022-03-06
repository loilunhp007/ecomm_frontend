import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../entity/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }
  getAllOrder():Observable<any>{
    return this.httpClient.get<Order[]>('http://localhost:8090/order/get/');
  }
  getAllOrderByTvmua(uID:string):Observable<any>{
    return this.httpClient.get<Order>('http://localhost:8090/order/get/user/'+uID);
  }
  getOrderById(orderID:string):Observable<any>{
    return this.httpClient.get<Order>('http://localhost:8090/order/get/'+orderID)
  }
   addOrder(order:Order):Observable<any>{
    return this.httpClient.post<Order>('http://localhost:8090/order/add',order);
  }
   updateOrderStatus(orderID:String,state:number):Observable<any>{
    return this.httpClient.put<Order>('http://localhost:8090/order/put/'+orderID+'/'+state,null);
  }
}

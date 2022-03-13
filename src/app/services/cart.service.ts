import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../entity/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { 
  }
  getCartItems(uid:String):Observable<any>{
    return this.httpClient.get<Cart[]>('https://be-ecommerce-2.herokuapp.com/cart/get/'+uid)
  }
  addToCart(uid:string,productID:String):Observable<any>{
    return this.httpClient.post<Cart>('https://be-ecommerce-2.herokuapp.com/cart/add/'+productID+'/'+uid,null)  
  }
  plusCart(uid:string,productID:String):Observable<any>{
    return this.httpClient.put<Cart>('https://be-ecommerce-2.herokuapp.com/cart/put/plus/'+productID+'/'+uid,null);
  }
  minusCart(uid:string,productID:String):Observable<any>{
    return this.httpClient.put<Cart>('https://be-ecommerce-2.herokuapp.com/cart/put/minus/'+productID+'/'+uid,null);
  }
  UpdateQuanCart(uid:string,productID:String,soluong:number):Observable<any>{
    return this.httpClient.put<Cart>('https://be-ecommerce-2.herokuapp.com/cart/put/'+productID+'/'+uid+'/'+soluong,null);
  }
  deleteCartItem(uid:string,productID:String):Observable<any>{
    return this.httpClient.delete<Cart>('https://be-ecommerce-2.herokuapp.com/cart/delete/'+productID+'/'+uid);
  }
  deleteCart(uid:string):Observable<any>{
    return this.httpClient.delete<Cart>('https://be-ecommerce-2.herokuapp.com/cart/delete/cart/'+uid);
  }
}

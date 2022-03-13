import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentMethod } from '../entity/paymentMethod';

@Injectable({
  providedIn: 'root'
})
export class PaymentserviceService {

  constructor(private httpClient:HttpClient) { }
  getAllPaymentMethod():Observable<any>{
    return this.httpClient.get<PaymentMethod[]>("https://be-ecommerce-2.herokuapp.com/paymentmethod/get");
  }
  addPayment(payment:PaymentMethod):Observable<any>{
    return this.httpClient.post<PaymentMethod>("https://be-ecommerce-2.herokuapp.com/paymentmethod/add",payment)
  }
  getPaymentMethodByID(id:number):Observable<any>{
    return this.httpClient.get<PaymentMethod[]>("https://be-ecommerce-2.herokuapp.com/paymentmethod/get/"+id);
  }
}

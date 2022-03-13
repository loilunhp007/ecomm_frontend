import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transport } from '../entity/transport';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private httpClient:HttpClient) { }
  getShipping():Observable<any>{
    return this.httpClient.get<Transport[]>('https://be-ecommerce-2.herokuapp.com/transport/get')
  }
  getShippingById(tid:String):Observable<any>{
    return this.httpClient.get<Transport>('https://be-ecommerce-2.herokuapp.com/transport/get/'+tid)
  }
  addTransport(transport:Transport):Observable<any>{
    return this.httpClient.post<Transport>('https://be-ecommerce-2.herokuapp.com/transport/add',transport)
  }
}

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
    return this.httpClient.get<Transport[]>('http://localhost:8090/transport/get')
  }
  getShippingById(tid:String):Observable<any>{
    return this.httpClient.get<Transport>('http://localhost:8090/transport/get/'+tid)
  }
  addTransport(transport:Transport):Observable<any>{
    return this.httpClient.post<Transport>('http://localhost:8090/transport/add',transport)
  }
}

import { Injectable } from '@angular/core';
import { Product } from '../entity/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inventory } from '../entity/inventory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }
  getProducts(){
    return this.httpClient.get<Product[]>("http://localhost:8090/products/get");
  }
  addProduct(product:Product): Observable<any>{
    return this.httpClient.post<Product>("http://localhost:8090/products/add",product);
  }
  updateProduct(product:Product){
    return this.httpClient.put<Product>("http://localhost:8090/products/put/"+product.productID,product);
  }
  deleteProduct(id:String){
    return this.httpClient.delete<Product>("http://localhost:8090/products/delete/"+id);
  }
  getProductByTrangthai(trangthai:number){
    return this.httpClient.get<Product>("http://localhost:8090/products/get");
  }  
  getProductByLikeTensp(tensp:String){
    return this.httpClient.get<Product[]>("http://localhost:8090/products/get/us/"+tensp);
  }
  getAllProducts(){
  return this.httpClient.get<Product[]>("http://localhost:8090/products/get");
  }
  
  getProductByID(id:String){
    return this.httpClient.get<Product>("http://localhost:8090/products/get/"+id);
  }
  deleteInventory(id:String):Observable<any>{
    return this.httpClient.delete<Inventory>("http://localhost:8090/inventory/delete/"+id);
  }
  updateInventory(productID:string,quantity:number):Observable<any>{
    return this.httpClient.put<Inventory>("http://localhost:8090/inventory/put/"+productID+"/"+quantity,null);
  }
  addInventory(inventory:Inventory):Observable<any>{
    return this.httpClient.post<Inventory>("http://localhost:8090/inventory/add",inventory);
  }
  getProductByCate(id:number):Observable<any>{
    return this.httpClient.get<Product[]>("http://localhost:8090/products/get/category/"+id)
  }
  getInventory():Observable<any>{
    return this.httpClient.get<Inventory[]>("http://localhost:8090/inventory/get")
  }
  
}

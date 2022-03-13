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
    return this.httpClient.get<Product[]>("https://be-ecommerce-2.herokuapp.com/products/get");
  }
  addProduct(product:Product): Observable<any>{
    return this.httpClient.post<Product>("https://be-ecommerce-2.herokuapp.com/products/add",product);
  }
  updateProduct(product:Product){
    return this.httpClient.put<Product>("https://be-ecommerce-2.herokuapp.com/products/put/"+product.productID,product);
  }
  deleteProduct(id:String){
    return this.httpClient.delete<Product>("https://be-ecommerce-2.herokuapp.com/products/delete/"+id);
  }
  getProductByTrangthai(trangthai:number){
    return this.httpClient.get<Product>("https://be-ecommerce-2.herokuapp.com/products/get");
  }  
  getProductByLikeTensp(tensp:String){
    return this.httpClient.get<Product[]>("https://be-ecommerce-2.herokuapp.com/products/get/us/"+tensp);
  }
  getAllProducts(){
  return this.httpClient.get<Product[]>("https://be-ecommerce-2.herokuapp.com/products/get");
  }
  
  getProductByID(id:String){
    return this.httpClient.get<Product>("https://be-ecommerce-2.herokuapp.com/products/get/"+id);
  }
  deleteInventory(id:String):Observable<any>{
    return this.httpClient.delete<Inventory>("https://be-ecommerce-2.herokuapp.com/inventory/delete/"+id);
  }
  updateInventory(productID:string,quantity:number):Observable<any>{
    return this.httpClient.put<Inventory>("https://be-ecommerce-2.herokuapp.com/inventory/put/"+productID+"/"+quantity,null);
  }
  addInventory(inventory:Inventory):Observable<any>{
    return this.httpClient.post<Inventory>("https://be-ecommerce-2.herokuapp.com/inventory/add",inventory);
  }
  getProductByCate(id:number):Observable<any>{
    return this.httpClient.get<Product[]>("https://be-ecommerce-2.herokuapp.com/products/get/category/"+id)
  }
  getInventory():Observable<any>{
    return this.httpClient.get<Inventory[]>("https://be-ecommerce-2.herokuapp.com/inventory/get")
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../entity/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }
  getCategories(){
    return this.httpClient.get<Category[]>("https://be-ecommerce-2.herokuapp.com/category/get");
  }
  addCategory(category:Category): Observable<any>{
    return this.httpClient.post<Category>("https://be-ecommerce-2.herokuapp.com/category/add",category);
  }
  updateCategory(category:Category){
    return this.httpClient.put<Category>("https://be-ecommerce-2.herokuapp.com/category/put/"+category.cateID,category);
  }
  deleteCategory(id:number):Observable<any>{
    return this.httpClient.delete<Category>("https://be-ecommerce-2.herokuapp.com/category/delete/"+id);
  }
}

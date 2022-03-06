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
    return this.httpClient.get<Category[]>("http://localhost:8090/category/get");
  }
  addCategory(category:Category): Observable<any>{
    return this.httpClient.post<Category>("http://localhost:8090/category/add",category);
  }
  updateCategory(category:Category){
    return this.httpClient.put<Category>("http://localhost:8090/category/put/"+category.cateID,category);
  }
  deleteCategory(id:number):Observable<any>{
    return this.httpClient.delete<Category>("http://localhost:8090/category/delete/"+id);
  }
}

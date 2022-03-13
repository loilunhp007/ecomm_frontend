import { Account } from '../entity/account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  login(account: Account): Observable<any>{

    return this.httpClient.post<Account>("https://be-ecommerce-2.herokuapp.com/user/login", account);
  }
  isLogged(){
    let sesson = JSON.parse(sessionStorage.getItem("uid"));
   if(sesson ==null || sesson===''){
     return false;
   }
   else{return true}
  }
  logOut(){
  sessionStorage.removeItem("uid");
  return false;
  }

}

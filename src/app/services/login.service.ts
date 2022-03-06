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

    return this.httpClient.post<Account>("http://localhost:8090/user/login", account);
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

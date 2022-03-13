import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../entity/account';
import { TypeMember } from '../entity/type-member';
import { UserDetail } from '../entity/user-detail';
import { Userdetail } from '../entity/userdetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private httpClient:HttpClient) { }

getUsers():Observable<any>{
     return this.httpClient.get<Userdetail[]>("https://be-ecommerce-2.herokuapp.com/userdetail/get");
   }
   getUsersByType(id:number):Observable<any>{
    return this.httpClient.get<Userdetail[]>("https://be-ecommerce-2.herokuapp.com/userdetail/get/type/"+id);
  }
  updateUser(userDetail: Userdetail):Observable<any> {
    return this.httpClient.put<Userdetail>('https://be-ecommerce-2.herokuapp.com/userdetail/put/'+userDetail.id, userDetail);   
   }
   deleteUser(uid:number){
    return this.httpClient.delete<string>('https://be-ecommerce-2.herokuapp.com/user/delete/'+uid)
  }
  getUserByID(id:string):Observable<any>{
    return this.httpClient.get<Userdetail>('https://be-ecommerce-2.herokuapp.com/userdetail/get/'+id)
  }
  addUserDetail(UserDetail: UserDetail):Observable<any> {
    return this.httpClient.post<UserDetail>('https://be-ecommerce-2.herokuapp.com/userdetail/add', UserDetail);   
   }
   addUser(newUser: Account):Observable<any> {
    return this.httpClient.post<Account>('https://be-ecommerce-2.herokuapp.com/user/add', newUser);   
   }
   getType():Observable<any>{
     return this.httpClient.get<TypeMember[]>("https://be-ecommerce-2.herokuapp.com/userdetail/gettype");
   }
   checkExistUser(account:Account):Observable<any>{
     return this.httpClient.post<string>("https://be-ecommerce-2.herokuapp.com/user/checkExistUser",account)
   }
   updateAccount(newUser: Account):Observable<any> {
    return this.httpClient.put<Account>('https://be-ecommerce-2.herokuapp.com/user/put/'+newUser.uid, newUser);   
   }
   getAccounts()
   {
     return this.httpClient.get<Account[]>("https://be-ecommerce-2.herokuapp.com/user/get");
   }
   deleteUserDetail(id:string):Observable<any>{
      return this.httpClient.delete<string>('https://be-ecommerce-2.herokuapp.com/userdetail/delete/'+id)
   }

}

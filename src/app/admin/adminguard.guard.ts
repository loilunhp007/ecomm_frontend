import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isBuffer } from 'util';
import { UserDetail } from '../entity/user-detail';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  constructor(private router:Router,
    private userService:UserService){}
    uid:string
    type:number
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
     if(sessionStorage.getItem('uid')==null ){
      this.router.navigate(['/adminlogin'])
       return false; 
    }
    this.uid=JSON.parse(sessionStorage.getItem('uid'));
    console.log(this.uid)
    this.type = this.getFirstNumberFromString(JSON.parse(sessionStorage.getItem('type'))) 
    console.log(this.type)
    if(this.type ==1 ||this.type == 3 || this.type == 4){
      console.log("admin + true")
      return true;
    }
    
      this.router.navigate(['/adminlogin'])
          return false;
     
  }
  getFirstNumberFromString(s:string){
    let a:number = Number(s.replace( /[^\d].*/, '' ))
    return a ; // creates array from matches
  }
  
  
}

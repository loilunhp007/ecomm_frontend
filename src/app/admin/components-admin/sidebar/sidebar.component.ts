import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./../../../../assets/admin/css/styles.css']
})
export class SidebarComponent implements OnInit {

  constructor(private userService:UserService) { }
  uid:string
  type:number
  role:string
  isAdmin:boolean;
  isManager:boolean=false
  ngOnInit(): void {
    if(sessionStorage.getItem('uid')!=null && sessionStorage.getItem('type')!=null){
      this.uid=JSON.parse(sessionStorage.getItem('uid'));
      this.role = JSON.parse(sessionStorage.getItem('type'));
      this.isAdmin = this.roleCheck(this.getFirstNumberFromString(this.role))
      this.isManager = this.managerCheck(this.getFirstNumberFromString(this.role))
    }
  }
  getFirstNumberFromString(s:string){
    let a:number = Number(s.replace( /[^\d].*/, '' ))
    return a ; // creates array from matches
  }
  roleCheck(role:number){
    if(role==1){
      return true;
    }
    return false;
  
  }
  managerCheck(role:number){
    if(role==4){
      return true;
    }
    else
    {return false;}
  }


}

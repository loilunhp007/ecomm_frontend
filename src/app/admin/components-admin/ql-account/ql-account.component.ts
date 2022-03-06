import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faLock, faTrash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { Account } from 'src/app/entity/account';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ql-account',
  templateUrl: './ql-account.component.html',
  styleUrls: ['./../../../../assets/admin/css/styles.css']
})
export class QlAccountComponent implements OnInit {
  users:Array<Account>
  constructor(private userService:UserService,private route:Router) { }
  faLock= faLock
  faUnlock=faUnlock
  faTrash=faTrash
  faEdit = faEdit
  type:number
  searchText;
  p:number=1
  ngOnInit(): void {
    this.getUser();
    this.type = this.getFirstNumberFromString(JSON.parse(sessionStorage.getItem('type')))
    this.permissonCheck(this.type);
  }
  permissonCheck(type:Number){
    if(this.type==1){
        return true;
    }else{
     
        alert("You dont have permission")
        this.route.navigate(['/admin/thongke'])
        return false;
    }
  }
  getFirstNumberFromString(s:string){
    let a:number = Number(s.replace( /[^\d].*/, '' ))
    return a ; // creates array from matches
  }
  getUser(){
    this.userService.getAccounts().subscribe(
      Response=>{
        this.users=Response
        console.log(this.users)
      }
    )
  }
  updateStatus(user:Account){
    let user2=user;
    let boolean =false
    if(user2.state==0){
      boolean=true
    }
    if(boolean==true){
      user2.state = 1 
      this.userService.updateAccount(user2).subscribe(
        Response=>{
          this.reloadCurrentRoute()
        }
      )
    }
  
  if(boolean==false){
    user2.state= 0; 
    this.userService.updateAccount(user2).subscribe(
      Response=>{
        this.reloadCurrentRoute()
      }
    )
  }
}
deleteUser(user:Account){
  if(confirm("Bạn chắc chắn muốn xóa?")){
    this.userService.deleteUser(user.uid).subscribe(
      Response=>{
        this.exit()
      },
      (error)=>{
        this.exit()
      }
    )
  }
}
exit() {
  location.reload();
}
reloadCurrentRoute() {
  let currentUrl = this.route.url;
  this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.route.navigate([currentUrl]);
      console.log(currentUrl);
  });
}
}

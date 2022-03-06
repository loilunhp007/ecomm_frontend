import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faLock, faTrash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { Userdetail } from 'src/app/entity/userdetail';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ql-khachhang',
  templateUrl: './ql-khachhang.component.html',
  styleUrls: ['./../../../../assets/admin/css/styles.css']
})
export class QlKhachhangComponent implements OnInit {

  constructor(private userService:UserService,
    public datepipe: DatePipe,
    private route:Router) { }
  users:Array<Userdetail> = [] 
  date:Date = new Date();
  day:string;
  days:Array<string>=[]
  faTrash=faTrash;
  faEdit = faEdit;
  faLock = faLock;
  faUnLock = faUnlock;
  searchText;
  p:number=1
  type:number
  ngOnInit(): void {
    this.getUser();
    this.type = this.getFirstNumberFromString(JSON.parse(sessionStorage.getItem('type')))
  }
  getUser(){
    this.userService.getUsersByType(2).subscribe(Response=>{
      this.users = Response;
      for(let i=0;i<this.users.length;i++){
        let date2 = new Date(this.users[i].timestamp);
        this.days.push(Math.floor((this.date.getTime() -  date2.getTime())/(1000*3600*24))+'')
        this.datepipe.transform(this.users[i].timestamp, 'yyyy-mm-dd')
      }
      console.log(this.users)
    },(error)=>{
      alert("something wrong happens")
    })
     
   
  }
  getFirstNumberFromString(s:string){
    let a:number = Number(s.replace( /[^\d].*/, '' ))
    return a ; // creates array from matches
  }
  blockUserCheck(user:Userdetail){
    if(this.type==4||this.type==1){
      this.blockUser(user);
    }else{
      alert("you are not allowed")
    }
  }
  deleteUserCheck(user:Userdetail){
    if(this.type==4||this.type==1){
      this.deleteUserDetail(user);
    }else{
      alert("you are not allowed")
    }
  }


  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.route.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }
  deleteUserDetail(user:Userdetail){
    this.userService.updateUser(user).subscribe(Response=>{
      this.userService.deleteUserDetail(user.id).subscribe(Response2=>{
        let result:string =Response2;
        if(result="0"){
          alert("delete success")
          this.reloadCurrentRoute();
        }
      })
    })
  }
  blockUser(user:Userdetail){
        if(user.state == 1){
          user.state=0
          this.userService.updateUser(user).subscribe(
            Response1=>{
              console.log(Response1)
              this.reloadCurrentRoute();
            }
          )
        }
        else{
          if(user.state == 0){
            user.state= 1
          this.userService.updateUser(user).subscribe(
            Response1=>{
              console.log(Response1)
              this.reloadCurrentRoute();
            }
          )
          }
        }
    
}
}

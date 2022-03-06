import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/entity/account';
import { UserDetail } from 'src/app/entity/user-detail';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  @ViewChild('loginForm')
  loginForm!: NgForm;
  account: Account;
  account2:Account
  userDetail:UserDetail
  constructor(private loginService:LoginService,
    private router:Router) { }
  uid:String;
  ngOnInit() {
  }

  onSubmit(){
    if(!this.loginForm.valid){
      console.log("Invalid data");
      alert("Invalid login")
      return;
    };
    let account = new Account();
    account.email = this.loginForm.value.email
    account.password = this.loginForm.value.password
      this.loginService.login(account)
      .subscribe(Response =>{
        this.account2=Response;
       if(this.account2.state==0){
         alert("Tài khoản của bạn đã bị vô hiệu hóa")
       }else{
        if(this.account2.userDetail.typeMember.typeID ==2){
          alert("you are not allowed")
          this.router.navigate(["/web/index"])
        }else{
          sessionStorage.setItem("uid",JSON.stringify(this.account2.userDetail.id))
          sessionStorage.setItem("type",JSON.stringify(this.account2.userDetail.typeMember.typeID+this.makeid(8)))
          this.router.navigate(["/admin/thongke"])
        }
       }
        
        
      },(error) => {
        console.log("Đăng nhập không thành công");
      });

  }
  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

}

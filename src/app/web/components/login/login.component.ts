
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Account } from 'src/app/entity/account';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm')
  loginForm!: NgForm;
  account: Account;
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
    console.log(this.loginForm.value);
    let account = new Account();
    account.email = this.loginForm.value.email
    account.password = this.loginForm.value.password
      this.loginService.login(account)
      .subscribe(Response =>{
        if(Response.state==0){
          alert("Tài khoản của bạn đã bị vô hiệu hóa")
        }else{
          sessionStorage.setItem("uid",JSON.stringify(Response.userDetail.id))
        this.router.navigate(["/web/index"]);

        console.log(Response);
        }
        
      },(error) => {
        alert("Đăng nhập không thành công")
        console.log("Đăng nhập không thành công");
      });

  }
}

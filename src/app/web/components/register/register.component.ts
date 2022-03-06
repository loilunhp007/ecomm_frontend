import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/entity/account';
import { TypeMember } from 'src/app/entity/type-member';
import { UserDetail } from 'src/app/entity/user-detail';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    regisFirstName: ['',Validators.required],
    regisLastName: ['',Validators.required],
    regisPhone: ['',[
                    Validators.required,
                    Validators.pattern('^((\\+84-?)|0)?[0-9]{10}$')
                ]],
    regisEmail: ['',[
                    //^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$
                    //^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$
                    Validators.required,
                    Validators.email
                ]],
    regisPassword: ['',
                    [Validators.minLength(6),
                     Validators.required,
                     Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') 
                    ]],
    regisAddress:['',
    [
      Validators.minLength(20),
    ]],
    regisBirthDay:['',Validators.required]            
  })
  userDetail:UserDetail
  user:Account
  typemembers:Array<TypeMember>;
  type:TypeMember
  constructor(private userService:UserService,
    private formBuilder:FormBuilder,
    private route:Router,
    public datepipe:DatePipe
    ) { }
    date = new Date();
  ngOnInit(): void {
    this.getType();
  }
  getType(){
    this.userService.getType().subscribe(Response=>{
      this.typemembers=Response;
      this.type = new TypeMember();
      this.type = this.typemembers.find(x=>x.typeID==2)
    })
  }
  validate( str:string){
    str.toLowerCase();
    return str;
  }
  get f1(){ return this.registerForm.controls}
  registerNewUser(){
        //userDetail
        let ac = new Account();
        ac.email = this.f1.regisEmail.value;
        ac.password = this.f1.regisPassword.value;       
         this.userService.checkExistUser(ac).subscribe(Response=>{
           console.log(Response.user);
           if(Response.user=='empty'){
            this.getType();
            this.userDetail = new UserDetail();
            this.user = new Account();
              this.userDetail.typeMember =this.type;
              this.userDetail.id="U_"
              this.userDetail.firstname = this.validate(this.f1.regisFirstName.value);
              this.userDetail.lastname = this.validate(this.f1.regisLastName.value);
              this.userDetail.phone = this.validate(this.f1.regisPhone.value);
              this.userDetail.gmail = this.validate(this.f1.regisEmail.value);
              this.userDetail.address = this.validate(this.f1.regisAddress.value);
              let date2:string = this.datepipe.transform(this.regisBirthDay.value,"yyyy-MM-dd")
              this.userDetail.birthday = date2;
              this.userDetail.state= 1;
              console.log(this.userDetail)
              this.userService.addUserDetail(this.userDetail).subscribe(
                (data)=>{
                  console.log(data);
                  this.user.email=this.validate(this.f1.regisEmail.value);
                  this.user.password = this.validate(this.f1.regisPassword.value);
                  this.user.state=1;
                  this.user.userDetail= data;
                  console.log(this.user)
                  this.userService.addUser(this.user).subscribe(
                          (user)=>{          
                            console.log(user);
                            sessionStorage.setItem("uid",JSON.stringify(this.user.userDetail.id));
                            alert("Dang ky thanh cong")
                              this.route.navigate(['/web/index']);
                          },
                          (error)=>{
                            alert("Có lỗi xảy ra vui lòng thử lại sau")
                          }
                        );       
                  }),
                  (error)=>{ alert("Có lỗi xảy ra vui lòng thử lại sau")}
           }else{
             alert("Email is exist");
           }
         })
             //user
        }
        get regisFirstName(){
          return this.registerForm.get('regisFirstName')
        }
        get regisLastName(){
          return this.registerForm.get('regisLastName')
        }
        get regisPhone(){
          return this.registerForm.get('regisPhone')
        }
        get regisEmail(){
          return this.registerForm.get('regisEmail')
        }
        get regisPassword(){
          return this.registerForm.get('regisPassword')
        }
        get regisAddress(){
          return this.registerForm.get("regisAddress");
        }
        get regisBirthDay(){
          return this.registerForm.get("regisBirthDay");
        }
}

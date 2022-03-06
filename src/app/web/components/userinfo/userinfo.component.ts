import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserDetail } from 'src/app/entity/user-detail';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  date:Date
  date2:Date
  userForm = this.formBuilder.group({
    firstName:['',Validators.required],
    lastName : ['',Validators.required],
    phone:['',Validators.required],
    address:['',Validators.required],
    birthday:[''],
    email:[''],
    startDay:[''],
  })
  userId:string
  userDetail:UserDetail

  constructor(private formBuilder:FormBuilder,
    private userService:UserService) { }

  ngOnInit(): void {
    this.userDetail = new UserDetail();
    if(sessionStorage.getItem("uid")!=null){
      this.userId = JSON.parse(sessionStorage.getItem("uid"));
    }
    if(this.userId!=null){
      this.loadUser(this.userId);
      
    }
  }
  getForm(){
    return this.userForm.controls;
  }
  get Ho() {
    return this.userForm.get('lastName');
  }
  get Ten() {
    return this.userForm.get('firstName');
  }
  get SDT() {
    return this.userForm.get('phone');
  }

  get BirthDay() {
    return this.userForm.get('birthday');
  }
  get StartDay() {
    return this.userForm.get('startDay');
  }
  get Email() {
    return this.userForm.get('email');
  }
  get Adress() {
    return this.userForm.get('address');
  }
  loadUser(id:string){
    this.userService.getUserByID(id).subscribe(
      Response=>{
          this.userDetail = Response;
          this.Ho.setValue(this.userDetail.firstname);
          this.Ten.setValue(this.userDetail.lastname)
          this.SDT.setValue(this.userDetail.phone)
          this.Email.setValue(this.userDetail.gmail)
          this.Adress.setValue(this.userDetail.address)
          this.BirthDay.setValue(this.userDetail.birthday)
      }
    )

  }
  updateUser(){
    let user2 = new UserDetail();
    this.userService.getUserByID(this.userId).subscribe(
      Response=>{
        user2=Response;
        user2.firstname = this.Ho.value
        user2.lastname = this.Ten.value
        user2.phone = this.SDT.value
        user2.gmail = this.Email.value
        user2.birthday= this.BirthDay.value;
        user2.address = this.Adress.value
        if(confirm("Bạn có chắc ?")){
          this.userService.updateUser(user2).subscribe(
            Response=>{
              alert("Update Sucess")
              this.exit();
            },
            (error)=>{
              console.error(error);
              alert("Update Sucess")
              
            }
            
          )
        }
        

      }
    )
  }
  exit() {
    location.reload();
  }
}

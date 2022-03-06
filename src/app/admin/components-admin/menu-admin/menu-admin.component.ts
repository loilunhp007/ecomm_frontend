import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./../../../../assets/admin/css/styles.css']
})
export class MenuAdminComponent implements OnInit {
  isLogged=false;
  constructor(private loginService:LoginService,
    private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.isLogged = this.loginService.logOut();
    sessionStorage.removeItem("type");
    return this.router.navigate(["/adminlogin"]);
  }
}

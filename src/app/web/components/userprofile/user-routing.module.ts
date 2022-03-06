import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserinfoComponent } from "../userinfo/userinfo.component";
import { UserprofileComponent } from "./userprofile.component";


const routes: Routes = [
  {
    path:'user',
    component:UserprofileComponent,
    children:[
      {
        path: '',
        redirectTo: '/web/user/userinfo',
        pathMatch:'full',    
      },
      {
        path : "userinfo",component:UserinfoComponent, 
      } ,
      
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

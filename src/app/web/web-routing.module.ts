import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';
import { SearchComponent } from './components/search/search.component';
import { WebComponent } from './web.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import { RegisterComponent } from './components/register/register.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import {OrderComponent} from './components/order/order.component'
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path:'web',
    component:WebComponent,
    children:[
      {
        path: '',
        redirectTo: '/web/index',
        pathMatch:'full',    
      },
      {
        path : "index",component:HomeComponent, 
      } ,
     
      {
        path:"cart",component:CartComponent
      },
      {path:"search",component:SearchComponent,pathMatch:'full'},
      {path:"product",component:ProductComponent,pathMatch:'full'},
      {path:"product-detail",component:ProductDetailComponent},
      {path:"contact",component:ContactsComponent},
      {path:"checkout",component:CheckoutComponent,pathMatch:'full'},
      {path:"register",component:RegisterComponent,pathMatch:'full'},
      {path:"user",component:UserprofileComponent,
        children:[{
          path:'',redirectTo:'userinfo',pathMatch:'full'},
          {path:'userinfo',component:UserinfoComponent},
          {path:"order",component:OrderComponent}
        ]
    },
    ],
    
    
  }, {
    path : "web/login", component:LoginComponent ,pathMatch:'full',
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }

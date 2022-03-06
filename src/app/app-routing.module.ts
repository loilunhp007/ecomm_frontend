import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './web/components/cart/cart.component';
import { HomeComponent } from './web/components/home/home.component';
import { LoginComponent } from './web/components/login/login.component';
import { PagenotfoundComponent } from './web/components/pagenotfound/pagenotfound.component';
import { ProductComponent } from './web/components/product/product.component';
import { SearchComponent } from './web/components/search/search.component';

const routes: Routes = [
  
  
  {
    path: '',
    redirectTo: '/web/index',
    pathMatch:'full',    
  },
  {
    path:'admin',redirectTo:'/admin',pathMatch:'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

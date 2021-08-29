import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartsComponent } from './carts/carts.component';
import { BillComponent } from './bill/bill.component';
import { InfocategoryComponent } from './infocategory/infocategory.component';
import { InfoProductComponent } from './info-product/info-product.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'cart',component:CartsComponent},
  {path:'payerCard',component:BillComponent},
  {path:'info',component:InfocategoryComponent},
  {path:'infop',component:InfoProductComponent },
  {path:'signin',component:SigninComponent },
  {path:'signup',component:SignupComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

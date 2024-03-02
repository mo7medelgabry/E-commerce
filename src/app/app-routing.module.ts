import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoryComponent } from './category/category.component';
import { MycartComponent } from './mycart/mycart.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProdutDetailsComponent } from './produt-details/produt-details.component';
import { authGuard } from './auth.guard';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { PaymentComponent } from './payment/payment.component';
import { OllordersComponent } from './ollorders/ollorders.component';

const routes: Routes = [
  {path:'',canActivate:[authGuard],component:HomeComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgetPassword',component:ForgetpasswordComponent},
  {path:'resetPassword',component:ResetpasswordComponent},
  {path:'home',canActivate:[authGuard],component:HomeComponent},
  {path:'brands',canActivate:[authGuard],component:BrandsComponent},
  {path:'category',canActivate:[authGuard],component:CategoryComponent},
  {path:'mycart',canActivate:[authGuard],component:MycartComponent},
  {path:'products',canActivate:[authGuard],component:ProductsComponent},
  {path:'productdetails/:Id',canActivate:[authGuard],component:ProdutDetailsComponent},
  {path:'profile',canActivate:[authGuard],component:ProfileComponent},
  {path:'wishlist',canActivate:[authGuard],component:WishlistComponent},
  {path:'checkout',canActivate:[authGuard],component:PaymentComponent},
  {path:'allorders',canActivate:[authGuard],component:OllordersComponent},
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

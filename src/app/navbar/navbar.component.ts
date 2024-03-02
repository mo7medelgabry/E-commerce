import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
 isLogin:boolean=false;
 cartNumber!:number;
constructor(private _auth:AuthService, private _cart:CartService){
  _cart.cartNumber.subscribe({
    next:(response)=>{console.log(response)
    this.cartNumber=response}
  })
 _auth.userData.subscribe({
  next:()=>{
    if(_auth.userData.getValue() !==null){
      this.isLogin=true;
     }else{
      this.isLogin=false;
     } 
  },
  error:(err)=>{}
 })
 
}


logout(){
  this._auth.logout();
}
}

import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {
cartItem:any;
constructor(private _cart:CartService){}

ngOnInit():void{
 this.getMyCart()
}
getMyCart(){
  this._cart.getCart().subscribe({
    next:(response)=>{console.log(response)
    this.cartItem=response.data;},
    error:(err)=>{console.log(err)}
  })
}
updateMyCart(count:number,id:string){
  if(count == 0){
    this.deleteMycart(id)
  }
  this._cart.updateCart(count,id).subscribe({
    next:(response)=>{console.log(response)
      this.cartItem=response.data; },
    error:(err)=>{console.log(err)}
  })
}
deleteMycart(id:string){
this._cart.deleteCart(id).subscribe({
  next:(response)=>{console.log(response)
    this.cartItem=response.data; 
  this._cart.cartNumber.next(response.numOfCartItems)},
  error:(err)=>{console.log(err)}
})
}

}

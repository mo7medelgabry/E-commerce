import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishListItems:any; 
constructor(private _cart:CartService, private toastr: ToastrService){}

ngOnInit():void{
 this.getMywishList()
}
getMywishList(){
  this._cart.getItemOfWishList().subscribe({
    next:(response)=>{console.log(response)
    this.wishListItems=response.data;},
    error:(err)=>{console.log(err)}
  })
}
updateMyCart(count:number,id:string){
  if(count == 0){
    this.deleteWishList(id)
  }
  this._cart.updateWishList(count,id).subscribe({
    next:(response)=>{console.log(response)
      this.wishListItems=response.data; },
    error:(err)=>{console.log(err)}
  })
}
deleteWishList(id:string){
this._cart.deleteWishList(id).subscribe({
  next:(response)=>{console.log(response)
    this.wishListItems=response.data; 
  this.getMywishList()
this.removelocal(id)},
  error:(err)=>{console.log(err)}
})
}
wishListStatus:{[id:string]:boolean}={}
toggleWishList(id:string){
  this.wishListStatus[id]=!this.wishListStatus[id];
  localStorage.setItem('wishlist',JSON.stringify(this.wishListStatus))
  if(!this.wishListStatus[id]){
    this.deleteWishList(id)
  }
}

removelocal(id:string){
  const wish=localStorage.getItem('wishlist');
  if(wish){
  const wishlst:{[productId:string]:boolean}=JSON.parse(wish);
  delete wishlst[id];
  localStorage.setItem('wishlist',JSON.stringify(wishlst))
  }
  
}

addToMyCart(productId:string){
  this._cart.addToCart(productId).subscribe({
   next:(response)=>{
    console.log(response);
    this._cart.cartNumber.next(response.numOfCartItems)
    this.toastr.success( response.message,'',{
      closeButton:true,
      positionClass:'toast-top-center',});

},
error:(err)=>{console.log(err)} 
})}

}

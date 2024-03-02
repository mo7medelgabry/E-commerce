import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { products } from '../interfaces/products';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  wishListItem:any[]=[]
  wishlistStatus:{[productId:string]:boolean}={}
  productList:products[]=[];
  searchValue:string='';
  isLoading:boolean=true;
  constructor(private _products:ProductsService, private _cart:CartService,private toastr: ToastrService) { 
 } 
 
 ngOnInit(){
  const store = localStorage.getItem('wishlist');
  if(store){
    this.wishlistStatus=JSON.parse(store);
    
    }
  
   this._products.getProduct().subscribe({
    next:(response)=>{this.productList=response.data;
    this.isLoading=false;
  },
    error:(err)=>{console.log(err)},
   }) 
   this.getCategory();
 }

 categoryList:any[]=[];
getCategory(){
  this._products.getCategories().subscribe({
    next:(response)=>{
    this.categoryList=response.data
    }
  })
}


 customOptions: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}

addToMyCart(productId:string){
  this._cart.addToCart(productId).subscribe({
   next:(response)=>{
    console.log(response);
    this._cart.cartNumber.next(response.numOfCartItems)
    this.toastr.success( response.message,'',{
      closeButton:true,
      positionClass:'toast-top-center',
      
    });

   }, 
   error:(err)=>{console.log(err)}
  })
} 

toggleWishList(productId:string){
  this.wishlistStatus[productId]=!this.wishlistStatus[productId];
  localStorage.setItem('wishlist',JSON.stringify(this.wishlistStatus))
  if(!this.wishlistStatus[productId]){
    this.deleteWishList(productId)
  }
}

addToMyWishlist(productId:string){
  this._cart.addToWishlist(productId).subscribe({
    next:(response)=>{
      console.log(response);
      this.toastr.success( response.message,'',{
        closeButton:true,
        positionClass:'toast-top-center',}) ;
        this.toggleWishList(productId)
    },
    error:(err)=>{console.log(err)}
  })
}

deleteWishList(id:string){
  this._cart.deleteWishList(id).subscribe({
    next:(response)=>{
      console.log(response);
      this.wishListItem=response.data;
    },
    error:(err)=>{console.log(err)}
  })

}



}






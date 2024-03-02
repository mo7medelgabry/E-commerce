import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produt-details',
  templateUrl: './produt-details.component.html',
  styleUrls: ['./produt-details.component.scss']
})
export class ProdutDetailsComponent {
  productDetails:any;
  constructor(private _activated:ActivatedRoute, private _product:ProductsService, private _cart:CartService,private toastr: ToastrService) {}
   
  ngOnInit(): void {
  let productId = this._activated.snapshot.params['Id']
    this._product.productDetails(productId).subscribe({
      next:(response)=>{this.productDetails=(response.data)},
    error:(err)=>{console.log(err)}
    })
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

}

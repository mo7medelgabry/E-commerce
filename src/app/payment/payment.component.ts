import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  constructor(private _cart:CartService) { }
  checkOut=new FormGroup({
    details: new FormControl(),
    phone: new FormControl(),
    city: new FormControl(),
  })

ngOnInit():void{
  this.getMyCart()
}


 cartId:string='';
  getMyCart(){
    this._cart.getCart().subscribe({
      next:(response)=>{console.log(response)
      this.cartId=response.data._id},
      error:(err)=>{console.log(err)}
    })
  }
  payment(form:FormGroup){
    console.log(form.value)
    this._cart.checkOut(this.cartId,form.value).subscribe({
      next:(response)=>{console.log(response)
      window.location=response.session.url},
      error:(err)=>{console.log(err)}
    })
  }

}

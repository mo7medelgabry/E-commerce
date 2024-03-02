import { AuthService } from './../services/auth.service';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ollorders',
  templateUrl: './ollorders.component.html',
  styleUrls: ['./ollorders.component.scss']
})
export class OllordersComponent implements OnInit {

  ngOnInit(): void {
    this.getAll(this._auth.userId.value.id)
  }
cartItems:any[]=[]

constructor(private _all:CartService, private _auth:AuthService){}

getAll(id:any){
  this._all.getAlloreders(id).subscribe({
    next:(response)=>{
      
      for( let i=0;i<response.length;i++){
        for(let j=0; j<response[i].cartItems.length;j++){
          console.log(response[i].cartItems[j])
          this.cartItems.push(response[i].cartItems[j])
        }
      
      }
    },
    error:(err)=>{console.log(err)}

  })
}

}

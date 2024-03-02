import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNumber = new BehaviorSubject(0)
headers:any={
  token:localStorage.getItem('userToken')
}
  constructor(private _http:HttpClient) { 
    this.getCart().subscribe({
      next:(response)=>{console.log(response)
      this.cartNumber.next(response.numOfCartItems)},
    })
  }

 addToCart(id:string):Observable<any>{
  return this._http.post(`https://ecommerce.routemisr.com/api/v1/cart`,    
  {
    productId:id 
  },
   {
  headers:this.headers
})
 }

 getCart():Observable<any>{
  return this._http.get(`https://ecommerce.routemisr.com/api/v1/cart`,    
   {
  headers:this.headers
})
 }

 updateCart(count:number,id:string):Observable<any>{
  return this._http.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    count:count
  },
  {
    headers:this.headers
  })   
 }
 deleteCart(id:string):Observable<any>{
  return this._http.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
  {
    headers:this.headers
  })   
} 

checkOut(id:string,formData:any):Observable<any>{
return this._http.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
{
  shippingAddress:formData
}

,{
 headers:this.headers
})
} 

addToWishlist(id:string):Observable<any> {
  return this._http.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,

  {
    productId:id
  },
  {
    headers:this.headers
  }
  
  )
}

getItemOfWishList():Observable<any> {
  return this._http.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,

  {
    headers:this.headers
  }
  
  )
}

updateWishList(count:number, id:string):Observable<any> {
  return this._http.put(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
{
count:count
},
  {
    headers:this.headers
  }
  
  )
}

deleteWishList(id:string):Observable<any> {
  return this._http.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,

  {
    headers:this.headers
  }
  
  )
}

getAlloreders(id:any):Observable<any> {
  console.log(id)
  return this._http.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${id}`,
  
  {
    headers:this.headers
},

)

}



}

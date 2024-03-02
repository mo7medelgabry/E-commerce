import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient,private _route:Router) {
    if(localStorage.getItem('userToken') != null){
      this.saveUserData();
    }
   }

   userId= new BehaviorSubject<any>(null); 
  
userData= new BehaviorSubject(null);
saveUserData(){
 let encodedToken:any = localStorage.getItem('userToken')
 let decodeToken:any =jwtDecode(encodedToken);
 this.userData.next(decodeToken);
 console.log(this.userData);
 this.userId.next(decodeToken);

}

logout(){
  localStorage.removeItem('userToken');
 this.userData.next(null);
  this._route.navigate(['/signin']);



}


  register(formData:any):Observable<any>{
     
return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formData)
  }

  login(formData:any):Observable<any>{
     
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,formData)
      }
    
    forgetPassword(formData:any):Observable<any>{
     
      return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,formData)
        } 
        verifycode(formData:any):Observable<any>{
     
          return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,formData)
            } 

         resetPassword(formData:any):Observable<any>{
     
          return this._http.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,formData)
            } 
  
}

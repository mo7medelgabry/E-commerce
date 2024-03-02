import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {
msgsuccess:any;
msgSu:any;
constructor(private _auth:AuthService,private Router:Router){}

forgetPassword= new FormGroup({
  
email: new FormControl(),

})

 
sendCode(form:FormGroup):void{
  this._auth.forgetPassword(form.value).subscribe({
  next:(response)=>{
     this.msgsuccess=response.message
    console.log(response)
    document.querySelector('.forgetpassword')?.classList.add('d-none')
    document.querySelector('.verifyCode')?.classList.remove('d-none')
  },
  error:(err)=>{console.log(err)}
  })
} 


//verify code

verifyCode = new FormGroup({
  resetCode: new FormControl(),
}) ;
verifyResetCode(form:FormGroup){
this._auth.verifycode(form.value).subscribe({
  next:(response)=>{
    this.msgSu = response.message;
    if(response.status == 'Success'){
      this.Router.navigate(['/resetPassword'])

    }
  },
  error:(err)=>{console.log(err)}
})
}






}

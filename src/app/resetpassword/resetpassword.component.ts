import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  errors!:string;
 isLoading:boolean=false;

constructor(private _auth:AuthService, private _Route:Router){}

  resetForm:FormGroup=new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    newPassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{4,8}$/)]),
    })
    
    
    resetSubmit(form:FormGroup){
         this.isLoading=true;
      
        if(this.resetForm.valid){
          this._auth.resetPassword(form.value).subscribe({
            next:(response)=>{
              
               
                this._Route.navigate(['/signin'])
              
              this.isLoading=false;
      
            },
             error:(err)=>{console.log(err) 
             this.errors=err.error.errors.message;
             this.isLoading=false;  
            }
          })
        }
      
      

} 
}

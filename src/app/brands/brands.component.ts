import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { products } from '../interfaces/products';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  brandsList:any[]=[];
  isLoading:boolean=true;
  details:any=null;
  img:any=null;
  visiable:boolean=true;

  constructor(private _brands:ProductsService) { }
  ngOnInit():void{
    this._brands.getBrands().subscribe({
      next:(response)=>{
        this.brandsList=response.data
        this.isLoading=false;

        console.log(this.brandsList)},
      error:(err)=>{console.log(err)}
    })
  }

toggle(brand:any){
  if(brand){
    this.details=brand
    this.img=brand.image
    this.visiable=!this.visiable 
    console.log(brand);
  }else{
    this.details=null
    this.img=null
    this.visiable=!this.visiable
  } 

}

}

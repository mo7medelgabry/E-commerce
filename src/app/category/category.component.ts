import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent { 
  categoryList:any[]=[];
  isLoading:boolean=true;
  categoryItem:any;

  constructor(private _category:ProductsService) { }
  ngOnInit():void{
    this._category.getCategories().subscribe({
      next:(response)=>{
        this.categoryList=response.data
        this.isLoading=false;},
      error:(err)=>{console.log(err)}
    })
  } 

  

}

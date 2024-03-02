import { products } from './interfaces/products';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:products[],searchWord:string):products[] {
    return products.filter((products)=>{return products.category.name.includes(searchWord) || products.title.includes(searchWord) });
  }

}

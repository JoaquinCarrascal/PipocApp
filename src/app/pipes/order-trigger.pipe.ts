import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderTrigger'
})
export class OrderTriggerPipe implements PipeTransform {

  transform(order?: number): string {

      let orderType = ['popularity.desc' , 'popularity.asc' , 'vote_average.desc' , 'vote_average.asc' ];
  
      //deafult y 0 -> popdesc , 1 -> popasc , 2 -> valdesc, 3 -> popasc 
  
      if(order === undefined)
        return orderType[0];
      else{
        switch (order) {
          case 0:
            return orderType[0];
          case 1:
            return orderType[1];
          case 2:
            return orderType[2];
          case 3:
            return orderType[3];
          default:
            return orderType[0];
        }
      }
  }

}

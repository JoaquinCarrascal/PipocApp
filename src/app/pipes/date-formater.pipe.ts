import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormater'
})
export class DateFormaterPipe implements PipeTransform {

  transform(date: string): string {
    // 2021-01-01 -> 01 Ene 2021
  const dateArray = date.split('-');
  const year = dateArray[0];
  let month = '';
  switch(dateArray[1]){
    case '01':
      month = 'Ene';
      break;
    case '02':
      month = 'Feb';
      break;
    case '03':
      month = 'Mar';
      break;
    case '04':
      month = 'Abr';
      break;
    case '05':
      month = 'May';
      break;
    case '06':
      month = 'Jun';
      break;
    case '07':
      month = 'Jul';
      break;
    case '08':
      month = 'Ago';
      break;
    case '09':
      month = 'Sep';
      break;
    case '10':
      month = 'Oct';
      break;
    case '11':
      month = 'Nov';
      break;
    case '12':
      month = 'Dic';
      break;
  }
  return `${dateArray[2]} ${month} ${year}`;
  }

}

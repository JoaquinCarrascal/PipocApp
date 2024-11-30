import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personSex'
})
export class PersonSexPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let lang = localStorage.getItem('lang') || 'es-ES';
    if (value === 1) {

      if (lang === 'es-ES') {
        return 'Mujer';
      }else{
        return 'Woman';
      }

    } else if (value === 2) {
      if(lang === 'es-ES'){
      return 'Hombre';
      }else{
      return 'Man';
      }
    }
    return null;
  }

}

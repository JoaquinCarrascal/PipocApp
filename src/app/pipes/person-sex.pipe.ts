import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personSex'
})
export class PersonSexPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === 1) {
      return 'Mujer';
    } else if (value === 2) {
      return 'Hombre';
    }
    return null;
  }

}

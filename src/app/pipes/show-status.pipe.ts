import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showStatus'
})
export class ShowStatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value === 'Ended') {
      return 'Terminada';
    }
    return value;
  }

}

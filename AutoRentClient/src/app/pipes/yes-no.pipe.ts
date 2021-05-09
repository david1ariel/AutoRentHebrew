import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    if(value===true) return 'Yes';
    return 'No';
  }

}

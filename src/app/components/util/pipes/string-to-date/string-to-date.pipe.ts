import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToDate',
})
export class StringToDatePipe implements PipeTransform {
  transform(value: string): Date {
    let regex = /(\d{4})-(\d{2})-(\d{2})/;
    let dateArray = regex.exec(value);
    let dateObject = new Date();
    // (+dateArray[1]),
    // ((+dateArray[2])) - 1,
    // (+dateArray[3])
    return dateObject;
  }
}

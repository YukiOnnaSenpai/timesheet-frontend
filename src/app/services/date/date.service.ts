import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { CustomDate, ICustomDate } from 'src/app/models/custom-date';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private dateSource = new BehaviorSubject<ICustomDate>(
    new CustomDate(moment(new Date()).toDate())
  );
  currentDate = this.dateSource.asObservable();

  constructor(private _datePipe: DatePipe) {}

  changeActiveDate(newDate: ICustomDate) {
    this.dateSource.next(newDate);
  }

  formatDate(date: Date) {
    return this._datePipe.transform(date, 'dd-MM-yyyy') || date;
  }

  formatDateToShortDate(date: Date) {
    return this._datePipe.transform(date, 'shortDate') || date;
  }

  formatDateToDatabaseDate(date: Date) {
    return this._datePipe.transform(date, 'yyyy-MM-dd') || date;
  }

  getMonthsNameAndYear(date: Date) {
    return this._datePipe.transform(date, 'LLLL,YYYY') || date;
  }

  getMonthsNameAndDate(date: Date) {
    return this._datePipe.transform(date, 'MMMM dd') || date;
  }

  getPreviousWeek() {
    this.currentDate.subscribe((element) => {
      element.date.setDate(element.date.getDate() - 7);
    });
  }

  getNextWeek() {
    this.currentDate.subscribe((element) => {
      element.date.setDate(element.date.getDate() + 7);
    });
  }

  getPreviousMonth() {
    this.currentDate.subscribe((element) => {
      element.date?.setMonth(element.date.getMonth() - 1);
      element.startingDateOfTheMonth?.setMonth(
        element.startingDateOfTheMonth.getMonth() - 1
      );
      element.endingDateOfTheMonth?.setMonth(
        element.endingDateOfTheMonth.getMonth() - 1
      );
    });
  }

  getNextMonth() {
    this.currentDate.subscribe((element) => {
      element.date?.setMonth(element.date.getMonth() + 1);
      element.startingDateOfTheMonth?.setMonth(
        element.startingDateOfTheMonth.getMonth() + 1
      );
      element.endingDateOfTheMonth?.setMonth(
        element.endingDateOfTheMonth.getMonth() + 1
      );
    });
  }
}

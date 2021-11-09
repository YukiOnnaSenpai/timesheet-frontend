import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { CustomDate, ICustomDate } from 'src/app/models/custom-date';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private dateSource = new BehaviorSubject<ICustomDate>(new CustomDate( moment(new Date()).toDate()));
  currentDate = this.dateSource.asObservable();

  constructor(private _datePipe: DatePipe) {
  }

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
    return this._datePipe.transform(date,'MMMM dd') || date;
  }

  getMonthsStartingDate(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  getMonthsEndingDate(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  getFormattedMonthStartingDate(date: Date) {
    return this.formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
  }

  getFormattedMonthEndingDate(date: Date) {
    return this.formatDate(
      new Date(date.getFullYear(), date.getMonth() + 1, 0)
    );
  }

  getStartOfTheWeekDate(date: Date) {
    return new Date(
      date.setDate(
        date.getDate() - date.getDay() + (date.getDay() == 0 ? -6 : 1)
      )
    );
  }

  getDatesOfWeekBasedOnDate(date: Date) {
    let startDate: Date = this.getStartOfTheWeekDate(date);
    let weekDates: Date[] = [startDate];
    for (let i = 1; i < 7; i++) {
      weekDates.push(new Date(date.setDate(startDate.getDate() + i)));
    }
    return weekDates;
  }

  getFirstDayOfTheWeek(date: Date) {
    let week: Date[] = this.getDatesOfWeekBasedOnDate(date);
    return week[0];
  }

  getLastDayOfTheWeek(date: Date) {
    let week: Date[] = this.getDatesOfWeekBasedOnDate(date);
    return week[week.length - 1];
  }

  getPreviousWeek() {
    this.currentDate.subscribe((element) => {
      element.date.setDate(element.date.getDate() - 7)
    })
    // return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
  }

  getNextWeek() {
    this.currentDate.subscribe((element) => {
      element.date.setDate(element.date.getDate() + 7)
    })
    // return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
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

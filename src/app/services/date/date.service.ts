import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private dateSource = new BehaviorSubject<Date>(new Date());
  currentDate = this.dateSource.asObservable();

  constructor(private _datePipe: DatePipe) {}

  formatDate(date: Date) {
    return this._datePipe.transform(date, 'dd-MM-yyyy') || date;
  }

  changeDate(date: Date) {
    this.dateSource.next(date);
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
}

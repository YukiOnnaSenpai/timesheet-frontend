import { Component, OnInit } from '@angular/core';
const DAY_MS = 60 * 60 * 24 * 1000;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  dates: Array<Date> | any;
  numbers: number[] = [];
  currentDate = new Date();

  constructor() {
    this.dates = this.getCalendarDays(this.currentDate);
    this.numbers = Array.from({ length: 5 }, (v, k) => k + 1);
  }

  ngOnInit(): void {
  }

  setMonth(inc: number) {
    const [year, month] = [this.currentDate.getFullYear(), this.currentDate.getMonth()];
    this.currentDate = new Date(year, month + inc, 1);
    this.dates = this.getCalendarDays(this.currentDate);
  }

  isSameMonth(currentDate: Date) {
    return currentDate.getMonth() === this.currentDate.getMonth();
  }

  private getCalendarDays(currentDate = new Date) {
    const calendarStartTime = this.getCalendarStartDay(currentDate)?.getTime() ?? currentDate.getDay();
    return this.range(0, 41).map(num => new Date(calendarStartTime + DAY_MS * num));
  }

  private getCalendarStartDay(date = new Date) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this.range(1, 7).map(num => new Date(firstDayOfMonth - DAY_MS * num)).find(dt => dt.getDay() === 0);
  }

  private range(start: number, end: number, length = end - start + 1) {
    return Array.from({ length }, (_, i) => start + i)
  }

}

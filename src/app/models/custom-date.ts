import * as moment from 'moment';

export interface ICustomDate {
  currentDate?: Date;
  date: Date;
  week?: Date[];
  startingDateOfTheMonth?: Date;
  endingDateOfTheMonth?: Date;
  startingDateOfTheWeek?: Date;
  endingDateOfTheWeek?: Date;
  curentMonthStartingDate?: Date;
  currnetMonthEndingDate?: Date;
}

export class CustomDate implements ICustomDate {
  public currentDate?: Date;
  public date: Date;
  public week?: Date[];
  public startingDateOfTheMonth?: Date;
  public endingDateOfTheMonth?: Date;
  public startingDateOfTheWeek?: Date;
  public endingDateOfTheWeek?: Date;
  public curentMonthStartingDate?: Date;
  public currnetMonthEndingDate?: Date;

  constructor(startingDate: Date) {
    this.date = new Date(startingDate);
    this.currentDate = moment(new Date()).toDate();
    this.week = this.calculateDaysOfTheWeek(startingDate);
    this.startingDateOfTheMonth = new Date(
      startingDate.getFullYear(),
      startingDate.getMonth(),
      1
    );
    this.endingDateOfTheMonth = new Date(
      startingDate.getFullYear(),
      startingDate.getMonth() + 1,
      0
    );
    this.startingDateOfTheWeek = this.week[0];
    this.endingDateOfTheWeek = this.week[this.week.length - 1];
    this.curentMonthStartingDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    this.currnetMonthEndingDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
  }

  calculateDaysOfTheWeek(date: Date): Date[] {
    let startDate: Date = new Date(
      date.setDate(
        date.getDate() - date.getDay() + (date.getDay() == 0 ? -6 : 1)
      )
    );
    let weekDates: Date[] = [startDate];
    for (let i = 1; i < 7; i++) {
      weekDates.push(new Date(date.setDate(startDate.getDate() + i)));
    }
    return weekDates;
  }
}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TimeSheetService } from 'src/app/services/time-sheet/time-sheet.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  displayedColumns = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  displayedColumnsMobile = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  dataSource: any[] = [];
  totalHours: number = 0;
  currentDate: Date = new Date();
  startDate: Date = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth(),
    1
  );
  originalStartDate: Date = new Date();
  endDate: Date = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth() + 1,
    0
  );
  originalEndDate: Date = new Date();

  constructor(
    private _timeSheetService: TimeSheetService,
    private _datePipe: DatePipe
  ) {
    this.originalStartDate = new Date(
      moment(new Date()).toDate().getFullYear(),
      moment(new Date()).toDate().getMonth(),
      1
    );
    this.originalEndDate = new Date(
      moment(new Date()).toDate().getFullYear(),
      moment(new Date()).toDate().getMonth() + 1,
      0
    );
  }

  ngOnInit(): void {
    this.loadData();
    this.currentDate = moment(new Date()).toDate();
  }

  transformDate(date: Date) {
    return this._datePipe.transform(date, 'dd-MM-yyyy') || date;
  }

  loadData() {
    this.totalHours = 0;
    this._timeSheetService
      .getTimeSheetsByMonth(
        this.transformDate(this.startDate) as Date,
        this.transformDate(this.endDate) as Date
      )
      .subscribe((timesheets) => {
        timesheets.forEach((one) => {
          this.totalHours += one.hours || 0;
          one.date = new Date(one.date as Date);
        });
        this.dataSource = Array(Math.ceil(timesheets.length / 7))
          .fill('')
          .reduce((acc, cur, index) => {
            return [...acc, [...timesheets].splice(index * 7, 7)];
          }, []);
      });
  }

  getPreviousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this.endDate.setMonth(this.endDate.getMonth() - 1);
    this.loadData();
  }

  getNextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.startDate.setMonth(this.startDate.getMonth() + 1);
    this.endDate.setMonth(this.endDate.getMonth() + 1);
    this.loadData();
  }
}

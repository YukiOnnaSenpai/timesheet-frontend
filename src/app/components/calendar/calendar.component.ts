import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  endDate: Date = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth() + 1,
    0
  );

  constructor(
    private timeSheetService: TimeSheetService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  transformDate(date: Date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy') || date;
  }

  loadData() {
    this.totalHours = 0;
    this.timeSheetService
      .getTimeSheetsByMonth(
        this.transformDate(this.startDate) as Date,
        this.transformDate(this.endDate) as Date
      )
      .subscribe((timesheets) => {
        timesheets.forEach((one) => {
          this.totalHours += one.hours || 0;
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

  // getCellClass(date: Date, hours: number) {
  //   // if(date < this.startDate) {
  //   //   return 'positive previous';
  //   // } else if(date > this.endDate) {
  //   //   return 'disable';
  //   // } else if(hours >= 7.5) {
  //   //   return 'positive';
  //   // } else if(hours > 0 && hours < 7.5) {
  //   //   return 'negative';
  //   // } else {
  //   //   return '';
  //   // }

  //   date = this.transformDate(date) as Date;
  //   if (date > this.transformDate(this.startDate) && date < this.transformDate(this.endDate)) {
  //     return hours >= 7.5 ? 'positive' : 'negative';
  //   } else if (date < this.transformDate(this.startDate)) {
  //     return hours >= 7.5 ? 'positive previous' : '';
  //   } else if (date > this.transformDate(this.endDate)) {
  //     return 'disable';
  //   } else {
  //     return '';
  //   }
  // }
}

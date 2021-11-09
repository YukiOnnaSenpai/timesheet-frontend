import { Component, OnInit } from '@angular/core';
import { CustomDate, ICustomDate } from 'src/app/models/custom-date';
import { DateService } from 'src/app/services/date/date.service';
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
  currentDate!: ICustomDate;
  title: string = '';

  constructor(
    private _timeSheetService: TimeSheetService,
    private _dateService: DateService
  ) {}

  ngOnInit(): void {
    this._dateService.currentDate.subscribe((element) => {
      this.currentDate = element;
    });
    this.loadData();
  }

  loadData() {
    this.totalHours = 0;
    this.title = this._dateService.getMonthsNameAndYear(
      this.currentDate.date
    ) as string;
    this._timeSheetService
      .getTimeSheetsByMonth(
        this._dateService.formatDate(
          this.currentDate.startingDateOfTheMonth as Date
        ) as string,
        this._dateService.formatDate(
          this.currentDate.endingDateOfTheMonth as Date
        ) as string
      )
      .subscribe((timesheets) => {
        timesheets.forEach((entry) => {
          this.totalHours += entry.hours || 0;
          entry.date = new Date(entry.date as Date);
        });
        this.dataSource = Array(Math.ceil(timesheets.length / 7))
          .fill('')
          .reduce((acc, cur, index) => {
            return [...acc, [...timesheets].splice(index * 7, 7)];
          }, []);
      });
  }

  getPreviousMonth() {
    this._dateService.getPreviousMonth();
    this.loadData();
  }

  getNextMonth() {
    this._dateService.getNextMonth();
    this.loadData();
  }

  setActiveDate(selectedDate: Date) {
    this._dateService.changeActiveDate(new CustomDate(selectedDate));
  }
}

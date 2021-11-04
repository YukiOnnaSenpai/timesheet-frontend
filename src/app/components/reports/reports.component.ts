import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IReports } from 'src/app/models/reports';
import { ITimeSheetCore } from 'src/app/models/time-sheet';
import { ReportsService } from 'src/app/services/reports/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  flag: number = 0;
  reportTotalHours: number = 0;
  data: ITimeSheetCore[] = [];
  currentDate = new Date();
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
  dataSource: MatTableDataSource<ITimeSheetCore> | any;
  queryString: IReports[] = [{ name: 'page', value: '1' }];
  displayedColumns: string[] = [
    'Date',
    'Team member',
    'Projects',
    'Categories',
    'Description',
    'Time',
  ];

  constructor(private _reportsService: ReportsService) {}

  ngOnInit(): void {
    this.flag = 4;
    this.getReports(this.queryString);
  }

  getReports(queryString: IReports[]) {
    this._reportsService.getReports(queryString).subscribe((records) => {
      records.forEach((one) => (this.reportTotalHours += one.time));
      this.dataSource = new MatTableDataSource(records);
    });
  }
}

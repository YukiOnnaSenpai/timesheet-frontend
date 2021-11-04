import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { ICategoryCore } from 'src/app/models/category';
import { IClientCore } from 'src/app/models/client';
import { IProjectCore } from 'src/app/models/project';
import { ITimeSheet } from 'src/app/models/time-sheet';
import { CategoryService } from 'src/app/services/category/category.service';
import { ClientService } from 'src/app/services/client/client.service';
import { DateService } from 'src/app/services/date/date.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TimeSheetService } from 'src/app/services/time-sheet/time-sheet.service';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.scss'],
})
export class CalendarDetailComponent implements OnInit {
  displayedColumns = [
    'client',
    'project',
    'category',
    'description',
    'time',
    'overTime',
  ];
  selectedDate: Date = moment(new Date()).toDate();
  firstDayOfTheWeek: Date = new Date();
  lastDayOfTheWeek: Date = new Date();
  week: Date[] = [];
  clients: IClientCore[] = [];
  projects: IProjectCore[] = [];
  categories: ICategoryCore[] = [];
  tableRows: number[] = [...Array(7).keys()];
  form!: FormGroup;
  data!: ITimeSheet;
  time: number = 0;

  constructor(
    private _dateService: DateService,
    private _clientService: ClientService,
    private _projectService: ProjectService,
    private _categoryService: CategoryService,
    private _timeSheetService: TimeSheetService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.week = this._dateService.getDatesOfWeekBasedOnDate(this.selectedDate);
    this.firstDayOfTheWeek = this.week[0];
    this.lastDayOfTheWeek = this.week[this.week.length - 1];
    this.getCategories(1);
    this.getProjects(1);
    this.getClients(1);
    this.getTimeSheetsByDay();
    this.form = this._formBuilder.group({
      tableFields: this._formBuilder.array([], [Validators.required]),
    });
    this.instantiateEmptyFields();
    this.onChanges();
  }

  public get tableFields(): FormArray {
    return this.form.get('tableFields') as FormArray;
  }

  instantiateEmptyFields() {
    const control = <FormArray>this.form.controls['tableFields'];
    this.tableRows.forEach((row) => {
      control.push(this.formingTimeSheetRowFromForm());
    });
  }

  trackByIndex(i: number) {
    return i;
  }

  formingTimeSheetRowFromForm() {
    return this._formBuilder.group({
      clientId: new FormControl('', Validators.required),
      projectId: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      description: new FormControl(''),
      time: new FormControl('', Validators.required),
      overTime: new FormControl(''),
    });
  }

  save() {
    this.tableFields.controls.forEach((element) => {
      if (element.touched && element.valid) {
        const timeSheet: ITimeSheet = {
          clientId: element.value.clientId,
          projectId: element.value.projectId,
          categoryId: element.value.categoryId,
          description: element.value.description,
          time: element.value.time,
          overTime: element.value.overTime,
          created: moment(new Date()).toDate(),
        };
        this._timeSheetService
          .addTimeSheet(timeSheet)
          .subscribe((entries) => (this.data = entries));
      }
    });
  }

  getPreviousWeek() {}

  getNextWeek() {}

  onChanges() {
    this.form.get('tableFields')?.valueChanges.subscribe((val) => {
      this.time = 0;
      val.forEach((element: ITimeSheet) => {
        this.time += Number(element.time) + Number(element.overTime);
      });
    });
  }

  getClients(pageNumber: number) {
    this._clientService
      .getClients(pageNumber)
      .subscribe((clients) => (this.clients = clients));
  }

  getProjects(pageNumber: number) {
    this._projectService
      .getProjects(pageNumber)
      .subscribe((projects) => (this.projects = projects));
  }

  getCategories(pageNumber: number) {
    this._categoryService
      .getCategories(pageNumber)
      .subscribe((categories) => (this.categories = categories));
  }

  getTimeSheetsByDay() {
    this._timeSheetService
      .getTimeSheetByDay(this.selectedDate)
      .subscribe((entries) => {
        this.data = entries;
        console.log('timeSheets', entries);
      });
  }
}

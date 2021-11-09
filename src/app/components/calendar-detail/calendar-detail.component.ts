import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ICategoryCore } from 'src/app/models/category';
import { IClientCore } from 'src/app/models/client';
import { CustomDate, ICustomDate } from 'src/app/models/custom-date';
import { IProjectCore } from 'src/app/models/project';
import {
  ITimeSheet,
  ITimeSheetCore
} from 'src/app/models/time-sheet';
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
  selectedDate!: ICustomDate;
  clients: IClientCore[] = [];
  projects: IProjectCore[] = [];
  categories: ICategoryCore[] = [];
  timeSheets: ITimeSheetCore[] = [];
  form!: FormGroup;
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
    this.loadCurrentDate();
    this.getCategories(1);
    this.getProjects(1);
    this.getClients(1);
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
    this._timeSheetService
      .getTimeSheetByDay(
        this._dateService.formatDateToDatabaseDate(
          this.selectedDate.date
        ) as Date
      )
      .subscribe((entries) => {
        this.timeSheets = entries;
        console.log('sheets', entries);
        let tableRows: number[] = [...Array(7 - this.timeSheets.length).keys()];
        this.timeSheets.forEach((sheet) => {
          control.push(this.formingTimeSheetRowFromForm(sheet));
        });
        tableRows.forEach((row) => {
          control.push(this.formingTimeSheetRowFromForm());
        });
      });
  }

  trackByIndex(i: number) {
    return i;
  }

  formingTimeSheetRowFromForm(timeSheetEntry?: ITimeSheet) {
    return this._formBuilder.group({
      clientId: new FormControl(
        timeSheetEntry?.clientId || '',
        Validators.required
      ),
      projectId: new FormControl(
        timeSheetEntry?.projectId || '',
        Validators.required
      ),
      categoryId: new FormControl(
        timeSheetEntry?.categoryId || '',
        Validators.required
      ),
      description: new FormControl(timeSheetEntry?.description || ''),
      time: new FormControl(timeSheetEntry?.time || '', Validators.required),
      overTime: new FormControl(timeSheetEntry?.overTime || ''),
    });
  }

  save() {
    this.tableFields.controls.forEach((element) => {
      const timeSheet: ITimeSheet = {
        clientId: element.value.clientId,
        projectId: element.value.projectId,
        categoryId: element.value.categoryId,
        description: element.value.description,
        time: Number(element.value.time),
        overTime: Number(element.value.overTime),
        created: this._dateService.formatDateToShortDate(
          this.selectedDate.date
        ) as Date,
      };
      if (element.touched && element.valid) {
        this._timeSheetService
          .addTimeSheet(timeSheet)
          .subscribe((entry) => this.timeSheets.push(entry as ITimeSheet));
      } else if (element.touched && element.valid && element.value != '') {
        const elementWithId: ITimeSheetCore =
          this.timeSheets.find((entry) => (entry = timeSheet)) ||
          <ITimeSheetCore>{};
        console.log('ID', elementWithId.id!);
        console.log('elemelon', timeSheet);
        this._timeSheetService
          .updateTimeSheet(timeSheet, elementWithId.id!)
          .subscribe((entry) => this.timeSheets.push(entry));
      }
    });
  }

  onChanges() {
    this.form.get('tableFields')?.valueChanges.subscribe((val) => {
      this.time = 0;
      val.forEach((element: ITimeSheet) => {
        this.time += Number(element.time) + Number(element.overTime);
      });
    });
  }

  setDifferentDate(date: Date) {
    this._dateService.changeActiveDate(new CustomDate(date));
    this.ngOnInit();
  }

  resetActiveDate() {
    this._dateService.changeActiveDate(new CustomDate(new Date()));
  }

  getPreviousWeek() {
    this._dateService.getPreviousWeek();
    this.ngOnInit();
  }

  getNextWeek() {
    this._dateService.getNextWeek();
    this.ngOnInit();
  }

  loadCurrentDate() {
    this._dateService.currentDate.subscribe(
      (element) => (this.selectedDate = element)
    );
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
}

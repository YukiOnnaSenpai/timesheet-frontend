import { DatePipe, TitleCasePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarDetailComponent } from './components/calendar-detail/calendar-detail.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { HeaderComponent } from './components/core/header/header.component';
import { PopupDialogComponent } from './components/dialogs/popup-dialog/popup-dialog.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AccordionComponent } from './components/util/accordion/accordion.component';
import { AlphaSortComponent } from './components/util/alpha-sort/alpha-sort.component';
import { FormComponent } from './components/util/form/form.component';
import { PaginationComponent } from './components/util/pagination/pagination.component';
import { SearchFilterPipe } from './components/util/pipes/search-filter/search-filter.pipe';
import { StringToDatePipe } from './components/util/pipes/string-to-date/string-to-date.pipe';
import { SearchboxComponent } from './components/util/searchbox/searchbox.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { DateService } from './services/date/date.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CalendarComponent,
    CalendarDetailComponent,
    OverviewComponent,
    ReportsComponent,
    PopupDialogComponent,
    AlphaSortComponent,
    SearchboxComponent,
    AccordionComponent,
    PaginationComponent,
    FormComponent,
    SearchFilterPipe,
    StringToDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    TitleCasePipe,
    DatePipe,
    DateService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

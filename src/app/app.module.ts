import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/core/header/header.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarDetailComponent } from './components/calendar-detail/calendar-detail.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PopupDialogComponent } from './components/dialogs/popup-dialog/popup-dialog.component';
import { AlphaSortComponent } from './components/util/alpha-sort/alpha-sort.component';
import { SearchboxComponent } from './components/util/searchbox/searchbox.component';
import { AccordionComponent } from './components/util/accordion/accordion.component';
import { PaginationComponent } from './components/util/pagination/pagination.component';

const Routes = [
  { path: '', redirectTo: 'timesheet', pathMatch: 'full' },
  { path: 'timesheet', component: CalendarComponent },
  { path: 'clients', component: OverviewComponent },
  { path: 'projects', component: OverviewComponent },
  { path: 'categories', component: OverviewComponent },
  { path: 'teamMembers', component: OverviewComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '**', component: CalendarComponent }
];

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
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(Routes),
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

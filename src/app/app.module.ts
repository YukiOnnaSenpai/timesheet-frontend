import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/core/header/header.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { HomeComponent } from './components/core/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarDetailComponent } from './components/calendar-detail/calendar-detail.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TitleComponent } from './components/core/title/title.component';

const Routes = [
  { path: '', redirectTo: 'timesheet', pathMatch: 'full' },
  { path: 'timesheet', component: CalendarComponent },
  { path: 'clients', component: OverviewComponent },
  { path: 'projects', component: OverviewComponent },
  { path: 'categories', component: OverviewComponent },
  { path: 'teamMembers', component: OverviewComponent },
  { path: 'reports', component: ReportsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CalendarComponent,
    CalendarDetailComponent,
    OverviewComponent,
    ReportsComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(Routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

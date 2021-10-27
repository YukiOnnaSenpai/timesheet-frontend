import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarDetailComponent } from './components/calendar-detail/calendar-detail.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: 'timesheet', pathMatch: 'full' },
  { path: 'timesheet', component: CalendarComponent },
  { path: 'clients', component: OverviewComponent },
  { path: 'projects', component: OverviewComponent },
  { path: 'categories', component: OverviewComponent },
  { path: 'team-members', component: OverviewComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'timesheet/day', component: CalendarDetailComponent },
  { path: '**', component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

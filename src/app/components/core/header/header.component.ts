import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cardNames = [
    { name: 'Timesheet', link: 'timesheet' },
    { name: 'Clients', link: 'clients' },
    { name: 'Projects', link: 'projects' },
    { name: 'Categories', link: 'categories' },
    { name: 'Team members', link: 'team-members' },
    { name: 'Reports', link: 'reports' },
  ];
  userActions = [
    { name: 'Change password', link: '' },
    { name: 'Settings', link: '' },
    { name: 'Export all data', link: '' },
  ];

  constructor() {}

  ngOnInit(): void {}
}

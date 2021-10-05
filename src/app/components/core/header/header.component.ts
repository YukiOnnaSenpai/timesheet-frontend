import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cardNames = [{name:'TimeSheet', link:'timesheet'}, {name:'Clients', link: 'clients'}, {name:'Projects', link:'projects'}, {name:'Categories', link:'categories'}, {name:'Team members', link:'teamMembers'}, {name:'Reports', link:'reports'}];
  

  constructor() { }

  ngOnInit(): void {
  }

}

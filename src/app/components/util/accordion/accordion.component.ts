import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data } from 'src/app/models/data';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  url: string;
  data: Data[] | any;
  allData: Data[] | any;

  @Input('filter') filterString = '';

  constructor(route: ActivatedRoute) {
    this.url = route.snapshot.url.join('');
  }

  ngOnInit(): void {
  }

  search(value: any): void {
    this.data = this.allData.filter((val: { sampleData: string; }) => val.sampleData.toLowerCase().includes(value));
  }

}

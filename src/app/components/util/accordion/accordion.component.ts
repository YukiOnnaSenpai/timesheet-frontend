import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  @Input('filter') filterString = '';
  @Input('flag') flag = 0;
  @Input('data') data: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  search(value: any): void {
    // this.data = this.allData.filter((val: { sampleData: string; }) => val.sampleData.toLowerCase().includes(value));
  }
}

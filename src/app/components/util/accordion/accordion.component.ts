import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  url: string;

  constructor(route: ActivatedRoute) {
    this.url = route.snapshot.url.join('');
  }

  ngOnInit(): void {
  }

}

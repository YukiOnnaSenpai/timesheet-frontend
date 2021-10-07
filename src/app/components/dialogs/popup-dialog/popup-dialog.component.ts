import { Component, Inject, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OverviewComponent } from '../../overview/overview.component';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss']
})
export class PopupDialogComponent implements OnInit {
  customers: string[] = ['Adam Software NV','Clockwork','Emperor Design'];
  leads: string[] = ['Sasa Popovic','Sladjana Miljanovic'];
  status = [{name: 'Active', value: 1}, {name: 'Inactive', value: 2}];
  roles = [{name: 'Admin', value: 1}, {name: 'Worker', value: 2}];

  constructor(public dialogRef: MatDialogRef<OverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

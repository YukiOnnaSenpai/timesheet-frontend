import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { OverviewComponent } from '../../overview/overview.component';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss'],
})
export class PopupDialogComponent implements OnInit {
  object = <any>{};

  constructor(
    public dialogRef: MatDialogRef<OverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }
}

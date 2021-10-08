import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupDialogComponent } from '../dialogs/popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  url: string;
  alphabetSortingString: string = '';

  constructor(route: ActivatedRoute, public dialog: MatDialog) {
    this.url = route.snapshot.url.join('');
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      data: {url: this.url}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  setSelectedCharacterForSorting(character: string) {
    this.alphabetSortingString = character;
  }

}

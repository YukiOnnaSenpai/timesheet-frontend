import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IClientCore } from 'src/app/models/client';
import { IProjectCore } from 'src/app/models/project';
import { ITeamMemberCore } from 'src/app/models/team-member';
import { ClientService } from 'src/app/services/client/client.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { PopupDialogComponent } from '../dialogs/popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  url: string;
  flag: number = 0;
  title: string = '';
  data: any[] = [];
  dataNames: string[] = [];
  alphabetSortingString: string = '';


  constructor(route: ActivatedRoute, 
    public dialog: MatDialog, 
    private clientService: ClientService,
    private projectService: ProjectService,
    private teamMemberService: TeamMemberService,
    private titlePipe: TitleCasePipe) {
    this.url = route.snapshot.url.join('');
  }

  ngOnInit(): void {
    this.flag = 0;
    if(this.url === 'clients'){
      this.getClients(1);
      this.flag = 1;
    } else if(this.url === 'projects'){
      this.getProjects(1);
      this.flag = 2;
    } else if(this.url === 'team-members'){
      this.getTeamMembers(1);
      this.flag = 3;
    } else if(this.url === 'categories'){
      this.flag = 4;
    }
    this.setTitle();
  }

  setTitle() {
      this.url = this.url.includes("-") ? this.url.replace("-"," ") : this.url;
      this.title = this.titlePipe.transform(this.url);
  }

  getClients(pageNumber: number) : void {
    this.data as IClientCore[];
    this.clientService.getClients(pageNumber).subscribe(clients => { 
      this.data = clients;
      this.dataNames = clients.map((item) => item.name);
     });
  }

  getProjects(pageNumber: number) : void {
    this.data as IProjectCore[];
    this.projectService.getProjects(pageNumber).subscribe(projects => {
      this.data = projects;
      this.dataNames = projects.map((item) => item.name);
    });
  }

  getTeamMembers(pageNumber: number): void {
    this.data as ITeamMemberCore[];
    this.teamMemberService.getTeamMembers(pageNumber).subscribe(teamMembers => this.data = teamMembers);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      data: {flag: this.flag}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  setSelectedCharacterForSorting(character: string) {
    this.alphabetSortingString = character;
  }

}

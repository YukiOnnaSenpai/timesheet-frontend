import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IClient } from 'src/app/models/client';
import { IProject } from 'src/app/models/project';
import { ITeamMember } from 'src/app/models/team-member';
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
  clients: IClient[] = [];
  projects: IProject[] = [];
  teamMembers: ITeamMember[] = [];
  alphabetSortingString: string = '';


  constructor(route: ActivatedRoute, 
    public dialog: MatDialog, 
    private clientService: ClientService,
    private projectService: ProjectService,
    private teamMemberService: TeamMemberService) {
    this.url = route.snapshot.url.join('');
  }

  ngOnInit(): void {
    this.flag = 0;
    if(this.url === 'clients'){
      this.getClients(1);
      this.flag = 1;
    } else if(this.url === 'projects'){
      this.flag = 2;
      this.getProjects(1);
    } else if(this.url === 'teamMembers'){
      this.flag = 3;
      this.getTeamMembers(1);
    } else if(this.url === 'categories'){
      this.flag = 4;
    }
  }

  getClients(pageNumber: number) : void {
    this.clientService.getClients(pageNumber).subscribe(clients => this.clients = clients);
  }

  getProjects(pageNumber: number) : void {
    this.projectService.getProjects(pageNumber).subscribe(projects => this.projects = projects);
  }

  getTeamMembers(pageNumber: number): void {
    this.teamMemberService.getTeamMembers(pageNumber).subscribe(teamMembers => this.teamMembers = teamMembers);
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

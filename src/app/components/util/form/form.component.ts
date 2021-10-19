import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IClient, IClientCore } from 'src/app/models/client';
import { ICountryCore } from 'src/app/models/country';
import { IProject, IProjectCore } from 'src/app/models/project';
import { IRoleCore } from 'src/app/models/role';
import { ITeamMember, ITeamMemberCore } from 'src/app/models/team-member';
import { ClientService } from 'src/app/services/client/client.service';
import { CountryService } from 'src/app/services/country/country.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { RoleService } from 'src/app/services/role/role.service';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  status = [
    { name: 'Active', value: 1 },
    { name: 'Inactive', value: 0 },
  ];
  countries: ICountryCore[] = [];

  clients: IClientCore[] = [];
  teamMembers: ITeamMemberCore[] = [];
  roles: IRoleCore[] = [];

  @Input('flag') flag = 0;
  @Input('selectedData') data = <any>{};
  @Input('parentComponent') parentComponentName = '';

  @Output() cancelEvent = new EventEmitter<string>();

  constructor(
    private countryService: CountryService,
    private teamMemberService: TeamMemberService,
    private clientService: ClientService,
    private roleService: RoleService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    if (this.flag == 1) {
      this.getCountries(1);
      this.data as IClientCore;
    } else if (this.flag == 2) {
      this.getTeamMembers(1);
      this.getClients(1);
      this.data as IProjectCore;
    } else {
      this.getRoles(1);
      this.data as ITeamMemberCore;
    }
  }

  save() {
    if (this.parentComponentName === 'accordion') {
      if (this.flag == 1) {
        this.clientService
          .updateClient(this.data as IClientCore, this.data.id)
          .subscribe((data) => (this.data = data as IClientCore));
      } else if (this.flag == 2) {
        this.projectService
          .updateProject(this.data as IProjectCore, this.data.id)
          .subscribe((data) => (this.data = data as IProjectCore));
      } else {
        console.log('data', this.data);
        this.teamMemberService
          .updateTeamMember(this.data as ITeamMemberCore, this.data.id)
          .subscribe((data) => (this.data = data as ITeamMemberCore));
      }
    } else {
      if (this.flag == 1) {
        this.clientService
          .addClient(this.data as IClient)
          .subscribe((data) => (this.data = data));
      } else if (this.flag == 2) {
        this.projectService
          .addProject(this.data as IProject)
          .subscribe((data) => (this.data = data));
      } else {
        this.teamMemberService
          .addTeamMember(this.data as ITeamMember)
          .subscribe((data) => (this.data = data));
      }
    }
    this.ngOnInit();
    this.cancel();
  }

  delete() {
    if (this.flag == 1) {
      this.clientService.deleteClient(this.data.id).subscribe();
    } else if (this.flag == 2) {
      this.projectService.deleteProject(this.data.id).subscribe();
    } else { 
      this.teamMemberService.deleteTeamMember(this.data.id).subscribe();
    }
    this.ngOnInit();
  }

  resetPassword() {}

  getCountries(pageNumber: number): void {
    this.countries = [];
    this.countryService
      .getCountries(pageNumber)
      .subscribe((countries) => (this.countries = countries));
  }

  getTeamMembers(pageNumber: number) {
    this.teamMembers = [];
    this.teamMemberService
      .getTeamMembers(pageNumber)
      .subscribe((teamMembers) => (this.teamMembers = teamMembers));
  }

  getClients(pageNumber: number) {
    this.clients = [];
    this.clientService
      .getClients(pageNumber)
      .subscribe((clients) => (this.clients = clients));
  }

  getRoles(pageNumber: number) {
    this.roles = [];
    this.roleService
      .getRoles(pageNumber)
      .subscribe((roles) => (this.roles = roles));
  }

  cancel() {
    this.cancelEvent.emit();
  }
}

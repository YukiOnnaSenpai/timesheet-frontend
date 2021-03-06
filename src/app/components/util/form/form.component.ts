import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategoryCore } from 'src/app/models/category';
import { IClient, IClientCore } from 'src/app/models/client';
import { ICountryCore } from 'src/app/models/country';
import { IProject, IProjectCore } from 'src/app/models/project';
import { IRoleCore } from 'src/app/models/role';
import { ITeamMember, ITeamMemberCore } from 'src/app/models/team-member';
import { CategoryService } from 'src/app/services/category/category.service';
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
  projects: IProjectCore[] = [];
  categories: ICategoryCore[] = [];

  @Input('flag') flag = 0;
  @Input('selectedData') data = <any>{};
  @Input('parentComponent') parentComponentName = '';

  @Output() cancelEvent = new EventEmitter<string>();

  constructor(
    private _countryService: CountryService,
    private _teamMemberService: TeamMemberService,
    private _clientService: ClientService,
    private _roleService: RoleService,
    private _projectService: ProjectService,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    if (this.flag == 1) {
      this.getCountries(1);
      this.data as IClientCore;
    } else if (this.flag == 2) {
      this.getTeamMembers(1);
      this.getClients(1);
      this.data as IProjectCore;
    } else if (this.flag == 3) {
      this.getRoles(1);
      this.data as ITeamMemberCore;
    } else {
      this.getTeamMembers(1);
      this.getClients(1);
      this.getProjects(1);
      this.getCategories(1);
    }
  }

  save() {
    if (this.parentComponentName === 'accordion') {
      if (this.flag == 1) {
        this._clientService
          .updateClient(this.data as IClientCore, this.data.id)
          .subscribe((data) => (this.data = data as IClientCore));
      } else if (this.flag == 2) {
        this._projectService
          .updateProject(this.data as IProjectCore, this.data.id)
          .subscribe((data) => (this.data = data as IProjectCore));
      } else {
        this._teamMemberService
          .updateTeamMember(this.data as ITeamMemberCore, this.data.id)
          .subscribe((data) => (this.data = data as ITeamMemberCore));
      }
    } else {
      if (this.flag == 1) {
        this._clientService
          .addClient(this.data as IClient)
          .subscribe((data) => (this.data = data));
      } else if (this.flag == 2) {
        this._projectService
          .addProject(this.data as IProject)
          .subscribe((data) => (this.data = data));
      } else {
        this._teamMemberService
          .addTeamMember(this.data as ITeamMember)
          .subscribe((data) => (this.data = data));
      }
    }
    this.ngOnInit();
    this.cancel();
  }

  delete() {
    if (this.flag == 1) {
      this._clientService.deleteClient(this.data.id).subscribe();
    } else if (this.flag == 2) {
      this._projectService.deleteProject(this.data.id).subscribe();
    } else {
      this._teamMemberService.deleteTeamMember(this.data.id).subscribe();
    }
    this.ngOnInit();
  }

  cancel() {
    this.cancelEvent.emit();
  }

  resetPassword() {}

  reset() {}

  search() {}

  getCountries(pageNumber: number): void {
    this._countryService
      .getCountries(pageNumber)
      .subscribe((countries) => (this.countries = countries));
  }

  getTeamMembers(pageNumber: number) {
    this._teamMemberService
      .getTeamMembers(pageNumber)
      .subscribe((teamMembers) => (this.teamMembers = teamMembers));
  }

  getClients(pageNumber: number) {
    this._clientService
      .getClients(pageNumber)
      .subscribe((clients) => (this.clients = clients));
  }

  getRoles(pageNumber: number) {
    this._roleService
      .getRoles(pageNumber)
      .subscribe((roles) => (this.roles = roles));
  }

  getProjects(pageNumber: number) {
    this._projectService
      .getProjects(pageNumber)
      .subscribe((projects) => (this.projects = projects));
  }

  getCategories(pageNumber: number) {
    this._categoryService
      .getCategories(pageNumber)
      .subscribe((categories) => (this.categories = categories));
  }
}

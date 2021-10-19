import { IProjectCore } from './project';
import { ITimeSheetCore } from './time-sheet';

export interface ITeamMember {
  id: string;
  name: string;
  hoursPerWeek: number;
  username: string;
  email: string;
  status: number;
  roles: string[];
}

export class TeamMember implements ITeamMember {
  public id: string;
  public name: string;
  public hoursPerWeek: number;
  public username: string;
  public email: string;
  public status: number;
  public roles: string[];

  constructor(id: string, name: string, hoursPerWeek: number,username: string, email: string, status: number, roles: string[]) {
      this.id = id;
      this.name = name;
      this.hoursPerWeek = hoursPerWeek;
      this.username = username;
      this.email = email;
      this.status = status;
      this.roles = roles;
  }
}

export interface ITeamMemberCore extends ITeamMember{
  password: string;
  timeSheets: ITimeSheetCore[];
  projects: IProjectCore[];
  isPasswordChanged: boolean;
}

export class TeamMemberCore extends TeamMember implements ITeamMemberCore {
  public password: string;
  public timeSheets: ITimeSheetCore[];
  public projects: IProjectCore[];
  public isPasswordChanged: boolean;

  constructor(id: string, name: string, hoursPerWeek: number,username: string, email: string, status: number, roles: string[], password: string, timeSheets: ITimeSheetCore[], projects: IProjectCore[], isPasswordChanged: boolean) {
    super(id, name, hoursPerWeek, username, email, status, roles);
    this.password = password;
    this.timeSheets = timeSheets;
    this.projects = projects;
    this.isPasswordChanged = isPasswordChanged;
}
}

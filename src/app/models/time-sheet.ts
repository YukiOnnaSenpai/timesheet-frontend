import { ICategoryCore } from './category';
import { IClientCore } from './client';
import { IProjectCore } from './project';
import { ITeamMemberCore } from './team-member';

export interface ITimeSheet {
  clientId: string;
  projectId: string;
  categoryId: string;
  description: string;
  time: number;
  overTime: number;
  created: Date;
}

export class TimeSheet implements ITimeSheet {
  public clientId: string;
  public projectId: string;
  public categoryId: string;
  public description: string;
  public time: number;
  public overTime: number;
  public created: Date;

  constructor(
    clientId: string,
    projectId: string,
    categoryId: string,
    description: string,
    time: number,
    overTime: number,
    created: Date
  ) {
    this.clientId = clientId;
    this.projectId = projectId;
    this.categoryId = categoryId;
    this.description = description;
    this.time = time;
    this.overTime = overTime;
    this.created = created;
  }
}

export interface ITimeSheetCore extends ITimeSheet {
  id: string;
  teamMemberId: string;
  date?: Date;
  hours?: number;
  client?: IClientCore;
  category?: ICategoryCore;
  project?: IProjectCore;
  teamMember?: ITeamMemberCore;
}

export class TimeSheetCore extends TimeSheet implements ITimeSheetCore {
  public id: string;
  public teamMemberId: string;
  public date?: Date;
  public hours?: number;
  public client?: IClientCore;
  public category?: ICategoryCore;
  public project?: IProjectCore;
  public teamMember?: ITeamMemberCore;

  constructor(
    id: string,
    clientId: string,
    projectId: string,
    categoryId: string,
    description: string,
    time: number,
    date: Date,
    overTime: number,
    created: Date,
    teamMemberId: string,
    hours?: number,
    client?: IClientCore,
    category?: ICategoryCore,
    project?: IProjectCore,
    teamMember?: ITeamMemberCore
  ) {
    super(
      clientId,
      projectId,
      categoryId,
      description,
      time,
      overTime,
      created
    );
    this.id = id;
    this.teamMemberId = teamMemberId;
    this.date = date;
    this.hours = hours;
    this.client = client;
    this.category = category;
    this.project = project;
    this.teamMember = teamMember;
  }
}

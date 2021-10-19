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

    constructor(clientId: string, projectId: string, categoryId: string, description: string, time: number, overTime: number, created: Date) {
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

}

export class TimeSheetCore extends TimeSheet implements ITimeSheetCore {
    public id: string;
    public teamMemberId: string;

    constructor(id: string, clientId: string, projectId: string, categoryId: string, description: string, time: number, overTime: number, created: Date, teamMemberId: string) {
        super(clientId,projectId,categoryId,description,time, overTime,created);
        this.id = id;
        this.teamMemberId = teamMemberId;
    }
    
}

import { ITimeSheetCore } from "./time-sheet";

export interface IProject {
    name: string;
    description: string;
    customerId: string;
    leadId: string;
}

export class Project implements IProject {
    public name: string;
    public description: string;
    public customerId: string;
    public leadId: string;

    constructor(name: string, description: string, customerId: string, leadId: string) {
        this.name = name;
        this.description = description;
        this.customerId = customerId;
        this.leadId = leadId;
    }
}

export interface IProjectUpdate extends IProject{
    projectStatus: number;
    archive: boolean;
}

export class ProjectUpdate extends Project implements IProjectUpdate {
    public projectStatus: number;
    public archive: boolean;

    constructor(name: string, description: string, customerId: string, leadId: string, projectStatus: number, archive: boolean) {
        super(name, description, customerId, leadId);
        this.projectStatus = projectStatus;
        this.archive = archive;
    }

}

export interface IProjectCore extends IProjectUpdate {
    id: string;
    timeSheets: ITimeSheetCore[];
}

export class ProjectCore extends ProjectUpdate implements IProjectCore {
    public id: string;
    public timeSheets: ITimeSheetCore[];

    constructor(id: string, name: string, description: string, customerId: string, leadId: string, projectStatus: number, archive: boolean, timeSheets: ITimeSheetCore[]) {
        super(name, description, customerId, leadId, projectStatus, archive);
        this.id = id;
        this.timeSheets = timeSheets;
    }
}

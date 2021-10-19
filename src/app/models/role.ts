import { ITeamMemberCore } from "./team-member";

export interface IRole {
    name: string;
}

export class Role implements IRole {
    public name: string;
    constructor(name: string) {
        this.name = name;    
    }
}

export interface IRoleCore extends IRole{
    id: string;
    teamMembers: ITeamMemberCore[];
}

export class RoleCore extends Role implements IRoleCore {
    public id: string;
    public teamMembers: ITeamMemberCore[];

    constructor(id: string, name: string, teamMembers: ITeamMemberCore[]) {
        super(name);
        this.id = id;
        this.teamMembers = teamMembers;
    }
}

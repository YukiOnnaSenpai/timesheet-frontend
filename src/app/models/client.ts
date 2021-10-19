import { IProjectCore } from "./project";
import { ITimeSheetCore } from "./time-sheet";

export interface IClient {
    name: string;
    address: string;
    city: string;
    countryId: number;
    postalCode: string;
}

export class Client implements IClient {
    public name: string;
    public address: string;
    public city: string;
    public countryId: number;
    public postalCode: string;

    constructor(name: string, address: string, city: string, countryId: number, postalCode:string) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.countryId = countryId;
        this.postalCode = postalCode;
    }
}

export interface IClientCore extends IClient {
    id: string;
    timeSheets: ITimeSheetCore[];
    projects: IProjectCore[];
}

export class ClientCore extends Client implements IClientCore {
    public id: string;
    public timeSheets: ITimeSheetCore[];
    public projects: IProjectCore[];

    constructor(id: string, name: string, address: string, city: string, countryId: number, postalCode:string, timeSheets: ITimeSheetCore[], projects: IProjectCore[]) {
        super(name, address, city, countryId, postalCode);
        this.id = id;
        this.timeSheets = timeSheets;
        this.projects = projects;
    }
}

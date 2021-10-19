import { ITimeSheetCore } from "./time-sheet";

export interface ICategory {
    name: string;
}

export class Category implements ICategory {
    public name: string;
    constructor(name: string) {
        this.name = name;    
    }
}


export interface ICategoryCore extends ICategory{
    id: string;
    timeSheets: ITimeSheetCore[];
}

export class CategoryCore extends Category implements ICategoryCore {
    public id: string;
    public timeSheets: ITimeSheetCore[];

    constructor(id: string, name: string, timeSheets: ITimeSheetCore[]) {
        super(name);
        this.id = id;
        this.timeSheets = timeSheets;
    }
}
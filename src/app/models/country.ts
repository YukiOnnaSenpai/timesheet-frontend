import { IClientCore } from "./client";

export interface ICountry {
    name: string;
}

export class Country implements ICountry {
    public name: string;
    constructor(name: string) {
        this.name = name;  
    }
}

export interface ICountryCore extends ICountry{
    id: string;
    clients: IClientCore[];
}

export class CountryCore extends Country implements ICountryCore {
    public id: string;
    public clients: IClientCore[];

    constructor(id: string,name: string, clients: IClientCore[]) {
        super(name);
        this.id = id; 
        this.clients = clients;  
    }
}


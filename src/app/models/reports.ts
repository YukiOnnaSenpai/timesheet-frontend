// export interface IReports {
//   categoryId: string;
//   teamMemberId: string;
//   clientId: string;
//   startDate: Date;
//   endDate: Date;
// }

// export class Reports implements IReports {
//   public categoryId: string;
//   public teamMemberId: string;
//   public clientId: string;
//   public startDate: Date;
//   public endDate: Date;

//   constructor(
//     categoryId: string,
//     teamMemberId: string,
//     clientId: string,
//     startDate: Date,
//     endDate: Date
//   ) {
//     this.categoryId = categoryId;
//     this.teamMemberId = teamMemberId;
//     this.clientId = clientId;
//     this.startDate = startDate;
//     this.endDate = endDate;
//   }
// }

export interface IReports {
    name: string;
    value: string;
}

export class Reports implements IReports {
    public name: string;
    public value: string;

    constructor(name: string,value: string) {
        this.name = name;
        this.value = value;
    }
}
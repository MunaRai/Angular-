import { User } from "@shared/models/user.model";
import { License } from "./license.model";

export class Distributor {
  distributorId: string;
  distributorName: string;
  distributorModelNumberId: string[];
  trackerId: string[];

  clientId: string[];

  userDto: User;

  licenseDtoList: any[];

  assignedTrackers : any[];
 
  showAddButtons =false;

  showDistributorList = true;

  userDtoList: User[] = [];

  constructor(){
    this.trackerId = [];
    this.clientId = [];
    this.distributorModelNumberId = [];
    this.licenseDtoList = [];
    this.assignedTrackers = [];
  }

}

import { Address } from '@shared/models/address.model';
import { Feature } from '@shared/models/feature.model';
import { addYears } from 'date-fns';
import { generateId } from '@shared/helpers/helper';

export class User {
  userCode: String;
  userId?: string;
  userDateCreated: Date;
  userDateModified: Date;
  userAccountType: string;
  userFirstName: string;
  showTrackerList=true;
  userMiddleName?: string;
  userLastName: string;
  userGender: string;
  userAddress: Address;
  userOrganizationName?: string;
  userRole: string;
  userEmail: string;
  userPhone: string;
  username?: string;
  userPassword?: string;
  userMap?: string;
  userDateExpires: Date;
  userWebsite?: string;
  userReseller?: User;
  userCreatedBy?: User;
  userFeatures?: Feature[];
  userTrackers?: string[];
  userStatus?: string;
  userDateLong: string;
  userCreatedFor: string;
  userAccountExpiry: Date;
  userClientId: string;
  userDisabled: boolean;

  favouriteTrackers: string[]=[];

  customerCareUserDto: any;

  result: User;

  constructor() {
    this.userCode = generateId();
    this.userFeatures = [];
    this.userTrackers = [];
    this.userStatus = 'ACTIVE';
    this.userDateCreated = new Date();
    this.userDateExpires = addYears(new Date(), 1);
    // this.userGender = 'Male';
    this.userAddress = new Address();
    // this.userAccountType = 'Fleet Owner';
    this.userDateLong = new Date().toString();
    // this.userRole = 'ROLE_FLEET_OWNER';
    this.userPhone = '';
    this.userFeatures = [];
    this.userCreatedFor = '';
  }
}

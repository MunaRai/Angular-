import { User } from "./user.model";

export class Driver{
    // orderMngTrackerId: number;
    orderMngDriverId?: string;
    orderMngDriverTagId: string;
    orderMngDriverLicenseId: string;
    orderMngDriverLicenseValid: Date;
    orderMngDriverDateOfJoining: Date;
    orderMngUserDto?: User;
    
}
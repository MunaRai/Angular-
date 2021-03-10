import { addYears } from 'date-fns';
import { User } from '@shared/models/user.model';
import { Feature } from '@shared/models/feature.model';
import { generateId } from '@shared/helpers/helper';

export class Tracker {
  trackerId?: string;
  trackerCode: string;
  trackerName?: string;
  trackerImeiNumber: string;
  trackerSimNumber: string;
  trackerUsers: string[];
  trackerModelName: string;
  trackerStatus?: string;
  trackerDateInstalled: Date;
  trackerModelNumber: String;
  trackerDateExpiry: Date;
  trackerIcon?: string;
  trackerCreatedFor: string;
  trackerDatePurchase?: Date;
  trackerSimProvider?: string;
  // trackerDateSimValid?: Date;
  trackerSimValidDate?: Date;
  trackerDateCreated: Date;
  trackerDateModified: Date;
  trackerFeatures: Feature[];
  trackerLat?: number;
  trackerLng?: number;
  trackerIsFavorite: boolean;
  trackerSpeedLimit: string;
  trackerTemperatures?: string;
  trackerClientId: string;
  trackerOdometer: number;
  result: Tracker[] = [];
  _id:string;
  routeAssign: boolean;
  vipTracker: boolean;

  constructor() {
    this.trackerCode = generateId();
    this.trackerName = '';
    this.trackerCreatedFor = '';
    this.trackerImeiNumber = null;
    this.trackerModelName = '';
    this.trackerUsers = [];
    this.trackerDateInstalled = new Date();
    this.trackerDatePurchase = new Date();
    this.trackerFeatures = [];
    this.trackerIcon = 'Truck';
    this.trackerDateExpiry = addYears(new Date(), 1);
    this.trackerStatus = 'INACTIVE';
    this.trackerLat = 0;
    this.trackerLng = 0;
    this.trackerSpeedLimit = '20';
  }
}

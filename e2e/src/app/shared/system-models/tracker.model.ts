import { generateId } from "@shared/helpers/helper";

export class Tracker{
    trackerId?: string;
    trackerModelNumberId: string;
    trackerModelName: string;
    trackerName: string;
    trackerImeiNumber: number;
    trackerSimNumber: string;
    trackerStatus?: string;
    trackerCode: string;

    constructor() {
        this.trackerCode = generateId();
        this.trackerName = '';
        this.trackerImeiNumber = null;
        this.trackerStatus = 'INACTIVE';
    }
}
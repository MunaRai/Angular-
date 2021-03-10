import { Stop } from "./stops.model";

export class Route{

	routeStopsId: string;
	
	stopCounts: number;

	fileToUpload: File;
	
	routeName:string;

	routeFileFormat: string;

	routeType: string;
	
	stops: Stop[] = [];

	showTracker = false;

	showStopList = false;

	constructor() {
	}
}
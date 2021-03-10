import { Stop } from "./stops.model";

export class RouteInformation {
    routeName: string;
    routeDirection: string;
    trackerImeiNumber: string;
    stops: Stop[] = [];
}




import { Tracker } from './tracker.model';
import { Coordinate } from './coordinate.model';
import { defaultCoordinates } from '@shared/constants/defaultCoordinates';

export interface Radius {
  value: number;
  unit: string;
}

export class Geofence {
  geofenceId?: string;
  trackerIds: string[];
  geofenceRadius?: number;
  geofenceType: string;
  geofenceName: string;
  geofenceLocation?: Coordinate;
  geofenceCenter?: Coordinate;
  geofenceColor: string;
  geofenceSpeed: number;
  geofenceGeometryList?: Coordinate[];

  // workaround for geofenceGeometryList not working
  geoJsonPolygon?: {points: Array<{x: number, y: number}>};

  // list of assigned trackers in detail, need to change the field later
  trackerId: Tracker[] = [];

  expanded?: boolean;

  constructor() {
    this.geofenceName = '';
    this.geofenceType = 'circle';
    this.trackerIds = [];
    this.geofenceGeometryList = [];
    this.geofenceColor = '#ff0000';
    this.geofenceCenter = defaultCoordinates;
    this.geofenceRadius = 200;
    this.geofenceLocation = defaultCoordinates;
    this.trackerId = [];
  }
}


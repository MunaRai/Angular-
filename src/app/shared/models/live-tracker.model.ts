export class LiveTracker {
  gpsAttributeAddress: string;
  gpsAttributeCourse: number;
  gpsAttributeLat: number;
  gpsAttributeLatDirection: string;
  gpsAttributeLng: number;
  gpsAttributeLngDirection: string;
  gpsAttributeSatelliteCount: number;
  gpsAttributeSpeed: number;
  gpsAttributeStatus: string;
  gpsAttributeDateCreated: number;
  gpsIgnition: boolean;
  gpsAttributeStatusUpdatedTime: number;
  trackerCode: string;
  trackerDateUpdated: number;
  trackerIcon: string;
  trackerId: string;
  trackerImeiNumber: string;
  trackerIsFavorite: boolean;
  trackerModelName: string;
  trackerName: string;
  distance: string;
  parkingTime: string;
  parkingSize: string;
  gpsAttributeSpeedInfoDto?: GpsAttributeSpeedInfoDto;
  trackerUsers: string[] = [];
  trackerOdometer: number;
}

export class GpsAttributeSpeedInfoDto {
  avg?: number;
  max?: number;
  min?: number;
  startedFromAddress?: string;
  currentAddress?: string;
  distanceStatistics?: String;
}

export class Information {
  trackerName: string;
  averageSpeed: number;
  maximumSpeed: number;
  totalDistance: number;
  startedAddress: string;
  currentAddress: string;
}

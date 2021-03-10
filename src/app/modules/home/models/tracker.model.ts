export class Tracker {
  id: string;
  name: string;
  status: string;
  speed: number;
  currentPosition: Coordinates;
}

export class Coordinates {
  lat: number;
  lng: number;
}

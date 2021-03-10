import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Geofence } from '@shared/models/geofence.model';
import { Coordinate } from '@shared/models/coordinate.model';

@Component({
  selector: 'p2s-geofence-map',
  templateUrl: './geofence-map.component.html',
  styleUrls: ['./geofence-map.component.scss'],
})
export class GeofenceMapComponent {

  @Input()
  geofence: Geofence;

  @Input()
  editable = false;

  @Input()
  zoom = 15;

  @Output()
  radiusChange: EventEmitter<number> = new EventEmitter();

  @Output()
  centerChange: EventEmitter<Coordinate> = new EventEmitter();

  @Output()
  mapClick: EventEmitter<Coordinate> = new EventEmitter();

  @Output()
  polygonPointDrag: EventEmitter<Coordinate[]> = new EventEmitter();

  unitMeasureMapping: any = {
    km: 1000,
    m: 1,
  };

  constructor(
  ) { }

  onMapclick(evt) {
    this.mapClick.emit(this.getLatLng(evt.target.center));
  }

  onCenterChange(evt) {
    this.centerChange.emit(this.getLatLng(evt.target.center));
  }

  onRadiusChange(evt) {
    this.radiusChange.emit(evt.target.radius);
  }

  getLatLng(center) {
    return {
      lat: center.lat(),
      lng: center.lng()
    };
  }

}

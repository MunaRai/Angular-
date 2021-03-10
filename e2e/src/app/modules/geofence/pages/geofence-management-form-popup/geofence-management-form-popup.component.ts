import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Geofence } from '@shared/models/geofence.model';
import { MapsAPILoader } from '@agm/core';
import { Coordinate } from '@shared/models/coordinate.model';

declare var google;
@Component({
  selector: 'p2s-geofence-management-form-popup',
  templateUrl: './geofence-management-form-popup.component.html',
  styleUrls: ['./geofence-management-form-popup.component.scss']
})
export class GeofenceManagementFormPopupComponent implements OnInit {

  mode = 'create';

  availableGeofences: Geofence[] = [];

  geofence = new Geofence();

  // copy of geofence
  // we need copy of the geofence because if the user changes the location
  // but doesn't change the coordinates of the points we don't want to position the center
  // to a different location than the existing geofence.
  gf: Geofence;

  placeSearch = '';

  @ViewChild('searchEl')
  searchEl: ElementRef;

  unitMeasureMapping: any = {
    km: 1000,
    m: 1
  };

  constructor(
    private modal: NgbActiveModal,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.setupPlacesAutocomplete();
    this.gf = { ...this.geofence };
  }

  private setupPlacesAutocomplete() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchEl.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();
          this.onPlaceSelect(place);
        });
      });
    });
  }

  onPlaceSelect(place: any) {
    this.gf.geofenceLocation = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
  }

  close() {
    this.setLocationNearGeofence();
    this.modal.close(this.gf);
  }

  setLocationNearGeofence() {
    if (this.gf.geofenceType === 'circle') {
      this.gf.geofenceLocation = this.gf.geofenceCenter;
    } else {
      const bounds = new google.maps.LatLngBounds();
      this.gf.geofenceGeometryList.map(coord => {
        const bound = new google.maps.LatLng(coord.lat, coord.lng);
        bounds.extend(bound);
      });
      const center = bounds.getCenter();
      this.gf.geofenceLocation = {
        lat: center.lat(),
        lng: center.lng()
      };
    }
  }

  dismiss() {
    this.modal.dismiss();
  }

  onCircleCenterChange(center) {
    this.gf.geofenceCenter = center;
    this.gf.geofenceLocation = center;
  }

  onMapClick(center: Coordinate) {
    if (this.gf.geofenceType === 'circle') {
      this.changeCircleCenter(center);
    } else {
      this.setPolygonPoints(center);
    }
  }

  changeCircleCenter(center: Coordinate) {
    const newGf = { ...this.gf };
    newGf.geofenceLocation = center;
    newGf.geofenceCenter = center;
    this.gf = newGf;
  }

  onRadiusChange(radius) {
    this.gf.geofenceRadius = Math.round(radius * 100) / 100;
  }

  setPolygonPoints(center: Coordinate) {
    this.gf.geofenceGeometryList = [...this.gf.geofenceGeometryList, center];
  }

  clearPolygonPoints() {
    this.gf.geofenceGeometryList = [];
  }

}

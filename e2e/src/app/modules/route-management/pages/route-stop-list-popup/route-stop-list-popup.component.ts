import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Route } from '@shared/models/route.model';

@Component({
  selector: 'p2s-route-stop-list-popup',
  templateUrl: './route-stop-list-popup.component.html',
  styleUrls: ['./route-stop-list-popup.component.scss']
})
export class RouteStopListPopupComponent  implements OnInit {

  route: Route;

  constructor(
    private modal: NgbActiveModal,
  ) { }

  ngOnInit(){}

  onCancel() {
    this.modal.dismiss();
  }


  redIcon = {
    url: 'assets/img/pin-red.svg',
    //decreasing the icon size
    scaledSize: new google.maps.Size(40,40)
  }

  
  optionsRed = {
    markerOptions: {
      suppressMarkers: true,
      icon: 'assets/img/no'
    },
    polylineOptions: {
      strokeColor: 'purple'
    }
  };

}

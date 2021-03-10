import { Component, OnInit } from '@angular/core';
import { FuelSensorPopupComponent } from '../../shared/fuel-sensor-popup/fuel-sensor-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'p2s-fuel-sensor',
  templateUrl: './fuel-sensor.component.html',
  styleUrls: ['./fuel-sensor.component.scss']
})
export class FuelSensorComponent implements OnInit {

  constructor(
    private modal:NgbModal,
  ) { }

  ngOnInit() {
  }


  showFuelSensorPopup(mode:string): void{
    const modal = this.modal.open(FuelSensorPopupComponent,{size:'sm'});
  }

  edit(){
  }

  delete(){}

}

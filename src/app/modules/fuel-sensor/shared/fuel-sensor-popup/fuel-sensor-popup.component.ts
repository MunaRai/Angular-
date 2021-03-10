import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'p2s-fuel-sensor-popup',
  templateUrl: './fuel-sensor-popup.component.html',
  styleUrls: ['./fuel-sensor-popup.component.scss']
})
export class FuelSensorPopupComponent implements OnInit {


  mode='add';

  constructor(
    private modal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  cancle(){
    this.modal.dismiss();
  }

  save(){
    
  }

}

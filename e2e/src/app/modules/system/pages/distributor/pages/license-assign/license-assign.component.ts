import { Component, OnInit } from '@angular/core';
import { Distributor } from '@shared/system-models/distributor.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenseService } from '../../../license/services/license.service';

@Component({
  selector: 'p2s-license-assign',
  templateUrl: './license-assign.component.html',
  styleUrls: ['./license-assign.component.scss']
})
export class LicenseAssignComponent implements OnInit {

  distributor: Distributor;

  licenseDetails: any[] = [];

  licenses: any[] = [];

  constructor(
    private modal: NgbActiveModal,
    private licenseService: LicenseService,
  ) { }

  ngOnInit() {
    this.fetchLicenses();
  }


  fetchLicenses(){
    this.licenseService.getAllLicenses()
      .subscribe(
        data => {
          this.licenses = data.result;
        }
      )
  }

  
  save(){
    this.modal.close(Object.assign({},this.distributor));
  }

  dismiss(){
    this.modal.dismiss();
  }


  licenseChecked(license,event){

    if(event.target.checked) {
      license.licenseIsChecked = true;
      this.licenseDetails.push(license);
    }
    else {
      license.licenseIsChecked = false;
      const existing = this.licenseDetails.find( lic => lic.licenseId===license.licenseId);
      
      const index = this.licenseDetails.indexOf(existing);
      this.licenseDetails.splice(index,1);
    }
  }


  licenseChanged(id, value ){ 
    if( value){
      const license = this.licenseDetails.find( lic => lic.licenseId===id);
      license.licenseCount = value;
      this.distributor.licenseDtoList = this.licenseDetails;
    }
  }

  

}

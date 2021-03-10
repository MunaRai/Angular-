import { Component, OnInit } from '@angular/core';
import { Distributor } from '@shared/system-models/distributor.model';
import { DistributorService } from '../../services/distributor.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'p2s-view-distributor',
  templateUrl: './view-distributor.component.html',
  styleUrls: ['./view-distributor.component.scss']
})
export class ViewDistributorComponent implements OnInit {

  distributor: Distributor;

  constructor(
    private distributorService: DistributorService,
    private modal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.fetchDistributorDetails();
    
  }


  fetchDistributorDetails(){
    this.distributorService.viewDistributorDetail(this.distributor.distributorId)
      .subscribe(
        data => {
          this.distributor = data.result;
        },
        error => {
          console.error('error fetching viewing details of distributor',error);
          
        }
      )
  }

  onCancel() {
    this.modal.dismiss();
  }

}

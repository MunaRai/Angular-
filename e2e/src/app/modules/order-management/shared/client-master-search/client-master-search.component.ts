import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientMaster } from '@shared/models/client-master.model';

@Component({
  selector: 'p2s-client-master-search',
  templateUrl: './client-master-search.component.html',
  styleUrls: ['./client-master-search.component.scss'],
})
export class ClientMasterSearchComponent implements OnInit {

  @Input()
  label = 'Search';

  searchTerm = '';

  isSearching = false;

  isClientMasterLoading = false;

  clientMasters: ClientMaster[] = [];

  selectedClientMaster: ClientMaster = null;

  @Output()
  select: EventEmitter<ClientMaster> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  searchClientMasters() {
    this.isSearching = true;
    this.isClientMasterLoading = true;
    setTimeout(() => {
      // this.clientMasters = [
      //   {
      //     id: 'CI1001',
      //     name: 'Ojit Sharma',
      //     phone: '819100123',
      //     email: 'ojit.sharma@gmail.com',
      //     address: {
      //       line1: 'C 47 Awas Colony',
      //       state: 'Uttar Pradesh',
      //       city: 'Agra',
      //       zip: '282007',
      //       country: 'India'
      //     },
      //     debtor: true
      //   },

      //   {
      //     id: 'CI2001',
      //     name: 'Binamra Sharma',
      //     phone: '819100123',
      //     email: 'binamra.sharma@gmail.com',
      //     address: {
      //       line1: 'C 47 Awas Colony',
      //       state: 'Uttar Pradesh',
      //       city: 'Agra',
      //       zip: '282007',
      //       country: 'India'
      //     },
      //     debtor: false
      //   },

      //   {
      //     id: 'CI3001',
      //     name: 'Prajwal Sharma',
      //     phone: '98311234412',
      //     email: 'prajwal.sharma@gmail.com',
      //     address: {
      //       line1: 'C 47 Awas Colony',
      //       state: 'Uttar Pradesh',
      //       city: 'Agra',
      //       zip: '282007',
      //       country: 'India'
      //     },
      //     debtor: true
      //   }
      // ];
      this.isClientMasterLoading = false;
    }, 1500);
  }

  selectClientMaster(cm: ClientMaster) {
    this.selectedClientMaster = cm;
    this.select.emit(cm);
    this.isSearching = false;
    this.searchTerm = `${this.label} ID: ${this.selectedClientMaster.clientMasterId}`;
  }

  onCancel() {
    this.selectedClientMaster = null;
    this.cancel.emit();
    this.searchTerm = '';
  }

}

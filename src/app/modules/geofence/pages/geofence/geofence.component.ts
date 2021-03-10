import { Component, OnInit, HostBinding } from '@angular/core';
import { Geofence } from '@shared/models/geofence.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeofenceManagementFormPopupComponent } from '../geofence-management-form-popup/geofence-management-form-popup.component';
import { GeofenceAssignmentPopupComponent } from '../geofence-assignment-popup/geofence-assignment-popup.component';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { GeofenceService } from '../../services/geofence.service';
import { ToastService } from '@shared/services/toast.service';
import { Tracker } from '@shared/models/tracker.model';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';

@Component({
  selector: 'p2s-geofence',
  templateUrl: './geofence.component.html',
  styleUrls: ['./geofence.component.scss']
})
export class GeofenceComponent implements OnInit {

  @HostBinding('class')
  className = 'col p-0 d-flex flex-column';

  geofences: Geofence[] = [];

  // need a copy of the geofence to compare the chagned value of assigned trackers
  // and show/hide save button accordingly
  geofencesCopy: Geofence[] = [];

  trackers: Tracker[] = [];

  selectedGeofence: Geofence;

  constructor(
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private geofenceService: GeofenceService,
    private toastr: ToastService
  ) { }

  ngOnInit() {
    this.fetchGeofences();
  }

  fetchGeofences() {
    this.spinner.show();
    this.geofenceService.getGeofences()
      .finally(() => this.spinner.hide())
      .subscribe(
          data => {
            if (data.result) {
              this.geofences = data.result;
              this.geofencesCopy = [...data.result];
              this.trackers = data.meta;
              this.collapseRows();
            }
          },
          err => {
          }
      );
  }

  onRowClick(gf: Geofence) {
    this.selectedGeofence = gf;
    this.collapseRows(gf);
  }

  collapseRows(gf?: Geofence) {
    this.geofences.map(mapGf => {
      return gf && gf.expanded ? mapGf.expanded = false : mapGf.expanded = mapGf === gf;
    });
  }

  showGeofencePopup(mode = 'add') {
    const modal = this.modal.open(GeofenceManagementFormPopupComponent, {
      windowClass: 'xl'
    });
    modal.componentInstance.mode = mode;
    if (mode === 'edit') {
      modal.componentInstance.geofence = {...this.selectedGeofence};
    }

    modal.result.then(
      geofence => {
        if (mode === 'add') {
          this.addGeofence(geofence);
        } else {
          this.updateGeofence(geofence);
        }
      },
      cancel => {}
    );
  }

  addGeofence(gf: Geofence) {
    this.spinner.show();
    this.geofenceService.addGeofence(gf)
      .finally(() => this.spinner.hide())
      .subscribe(
        (res => {
          this.toastr.popSucces('Geofence Saved');
          this.geofences.unshift(res.result);
        }),
        (err => {
          this.toastr.popError('Error Saving Geofence');
        })
      );
  }

  updateGeofence(gf: Geofence) {
    this.spinner.show();
    this.geofenceService.updateGeofence(gf)
      .finally(() => this.spinner.hide())
      .subscribe(
        success => {
          const idx = this.geofences.indexOf(this.selectedGeofence);
          this.geofences.splice(idx, 1, success.result);
          this.selectedGeofence = this.geofences[idx];
          this.toastr.popSucces('Geofence Updated.');
        },
        err => {
          // hack, remove later
          const idx = this.geofences.indexOf(this.selectedGeofence);
          this.geofences.splice(idx, 1, gf);
          this.selectedGeofence = this.geofences[idx];
          this.toastr.popSucces('Geofence Updated.');

          // enable the following later
          // this.toastr.popError('Error saving data.');
        }
      );
  }

  deleteGeofence(id) {
    this.spinner.show();
    this.geofenceService.deleteGeofence(id)
      .finally(() => this.spinner.hide())
      .subscribe(
        () => {
          this.geofences = this.geofences.filter(gf => gf.geofenceId !== id);
          this.geofencesCopy = [...this.geofences];
          this.selectedGeofence = null;
          this.toastr.popSucces('Geofence Removed.');
        },
        err => {
          this.toastr.popError('Error Removing Geofence.');
        }
      );
  }

  showDeleteGeofenceConfirmation() {
    const modal = this.modal.open(DeleteConfirmationPopupComponent);
    modal.componentInstance.message = 'Are you sure you want to remove this geofence?';
    modal.result.then(
      () => {
        this.deleteGeofence(this.selectedGeofence.geofenceId);
      },
      () => {}
    );
  }

  showGeofenceAssignmentPopup() {
    const modal = this.modal.open(GeofenceAssignmentPopupComponent, {size: 'sm'});

    modal.componentInstance.trackers = this.trackers;
    modal.componentInstance.selectedTrackers = this.selectedGeofence.trackerId || [];

    modal.result.then(
      trackers => {
        const gf = {
          ...this.selectedGeofence,
          trackerIds: trackers.map(tr => tr.trackerId),
          trackerId: trackers
        };
        this.updateGeofence(gf);
      },
      () => {}
    );
  }

}

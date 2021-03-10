import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouteManagementPopupComponent } from '../../shared/route-management-popup/route-management-popup.component';
import { Route } from '../../../../shared/models/route.model';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import { RouteService } from '../../services/route.service';
import { TrackerService } from 'app/modules/tracker-management/services/tracker.service';
import { Tracker } from '@shared/models/tracker.model';
import { AssignTrackerPopupComponent } from '../assign-tracker-popup/assign-tracker-popup.component';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { RouteStopListPopupComponent } from '../route-stop-list-popup/route-stop-list-popup.component';
import { RouteInformationService } from '@shared/services/route-information.service';
import { RouteEditComponent } from '../../shared/route-edit/route-edit.component';

@Component({
  selector: 'p2s-route-management',
  templateUrl: './route-management.component.html',
  styleUrls: ['./route-management.component.scss']
})
export class RouteManagementComponent implements OnInit {

  @Input()
  route: Route = new Route();

  selectedRoute: Route;

  pagingSorting: PaginationResult = new PaginationResult();

  routes: Route[] = [];

  tempRoutes: Route[] = [];

  trackerList: Tracker[] = [];

  mode = 'add';

  routeStops = [];

  constructor(
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastService,
    private routeService: RouteService,
    private trackerService: TrackerService,
    private routeInfoService: RouteInformationService

  ) {
  }

  ngOnInit() {
    this.fetchData();
  }


  fetchData() {
    this.routeService.getRouteDetails()
      .subscribe(
        data => {
          this.routes = data.result;
          this.tempRoutes = data.result;
          this.routes.forEach(route => {
            route.stopCounts = route.stops.length;
          });
        },
        error => {
          // console.error('error fetching routing details', error);
        }
      );
  }

  showRoutepopup(mode: string): void {
    const route: Route = mode === 'edit' ? this.selectedRoute : new Route();
    if(mode==='add'){
      const modal: NgbModalRef = this.modal.open(RouteManagementPopupComponent, { size: 'lg' });
    
      modal.componentInstance.mode = mode;
      modal.componentInstance.route = route;

      modal.result.then(
        data => {
          this.spinner.show();
          
            const sub = this.routeService.addRoute(data)
              .finally(() => this.spinner.hide())
              .subscribe(
                res => {
                  this.toastr.popSucces('Route Created');
                  this.routes.unshift(res.result);
                  sub.unsubscribe();
                  this.fetchData();
                },
                error => {
                  this.toastr.popError('Error creating Route');
                  sub.unsubscribe();
                }
              );
        }
      );
    }

    else {
      
      const modal: NgbModalRef = this.modal.open(RouteEditComponent, { size: 'lg' });
    
      modal.componentInstance.mode = mode;
      modal.componentInstance.route = route;
        
    }
  }



  showTrackerAssignpopup(route) {
    const modal: NgbModalRef = this.modal.open(AssignTrackerPopupComponent, { size: 'lg' });
    modal.componentInstance.route = route;

    modal.result.then(
      data => {
        const sub = this.trackerService.assignTrackerToRoute(data)
          .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              this.toastr.popSucces('Tracker Successfully Assigned For the route');
              sub.unsubscribe();
            },
            error => {
              this.toastr.popError('Error assigning trackers for thr route');
              sub.unsubscribe();
            }
          );
      }
    );
  }

  next() {
    this.pagingSorting.page++;
    this.fetchData();
  }

  previous() {
    this.pagingSorting.page--;
    this.fetchData();
  }

  gotoPage(page) {
    if (page <= this.pagingSorting.totalPages && page > 0) {
      this.pagingSorting.totalPages = page;
      this.fetchData();
    } else {
      this.fetchData();
    }
  }

  changeLimit(limit) {
    this.pagingSorting.size = limit;
    this.fetchData();
  }


  delete() {
    const modal: NgbModalRef = this.modal.open(DeleteConfirmationPopupComponent);
    modal.result.then(
      yes => {
        this.spinner.show();
        const idx = this.routes.indexOf(this.selectedRoute);
        const sub = this.routeService.deleteRoute(this.selectedRoute.routeStopsId)
          .finally(() => this.spinner.hide())
          .subscribe(
            res => {
              if (res.code === 200) {
                this.routes[idx] = res.result;
                this.toastr.popSucces('Route removed.');
                this.routes.splice(idx, 1);
                this.selectedRoute = null;
                sub.unsubscribe();
              } else if (res.code === 400) {
                this.toastr.popError(res.result);
              }
            },
            err => {
              console.error(err);
              this.toastr.popError('Error removing Route.');
              sub.unsubscribe();
            }
          );
      },
      () => { }
    );
  }

  showStopList(route) {
    const modal: NgbModalRef = this.modal.open(RouteStopListPopupComponent, { size: 'lg' });
    modal.componentInstance.route = route;
  }

  onSearch(keyword) {
    keyword = keyword.trim();
    if (keyword == '' && keyword == null) {
      this.routes = this.tempRoutes;
    } else {
      this.routes = this.tempRoutes.filter(function(route) {
        return (
          route.routeName.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
        )
      }); 
    }
  }
}

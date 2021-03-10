import { Component, OnInit } from '@angular/core';
import { Route } from '@shared/models/route.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Stop } from '@shared/models/stops.model';
import { RouteService } from '../../services/route.service';
import { ToastService } from '@shared/services/toast.service';
import { CheckPattern } from '@shared/models/check-pattern.model';

@Component({
  selector: 'p2s-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.scss']
})
export class RouteEditComponent implements OnInit {

  route: Route;
  updatedStop: Stop= new Stop();
  upDatedStopList: Stop[] =[];
  upDatedRoute: Route= new Route();
  newStop= false;
  editedStopList: Stop[];
  constructor(
    private modal: NgbActiveModal,
    private routeService: RouteService,
    private toastrService: ToastService,
  ) { }

  saveDisabled = false;

  checkPattern: CheckPattern = new CheckPattern();

  ngOnInit() {

  }

  save(){
    
    this.route.stops.forEach(stop => {
    this.updatedStop.stopName = stop.stopName;
    this.updatedStop.lat = stop.lat;
    this.updatedStop.lng = stop.lng;
      
    });
    this.upDatedStopList.push(this.updatedStop);

    this.upDatedRoute.routeStopsId = this.route.routeStopsId;
    this.upDatedRoute.routeName = this.route.routeName;
    this.upDatedRoute.routeType = this.route.routeType;
    this.upDatedRoute.stops = this.upDatedStopList;

    this.routeService.upDateRoute(this.upDatedRoute)
      .subscribe(
        data =>{
          this.toastrService.popSucces('Route Stops successfully updated');
            this.modal.dismiss();
          
        },
        error =>{
          this.toastrService.popError('Error updating Route');
          console.log('error',error);
          this.modal.dismiss();
          
        }
      )
    
  }

  dismiss(){
    this.modal.dismiss();
  }

  removeStop(stop: Stop){
    this.editedStopList = this.route.stops;
    const indx = this.editedStopList.indexOf(stop);
      this.editedStopList.splice(indx,1);
      this.route.stops = this.editedStopList;
      
  }

addNewStop(index){
  const stop= new Stop();
  // let stop ={'stopName':'','lat':null,'lng':null,}
  this.route.stops.splice(index*1+1,0,stop); 
}

checkStopName(stop) {
  if(stop.stopName.includes('<' ) || stop.stopName.includes('>' ) || stop.stopName.includes('/' ) || stop.stopName.includes('=' ) || stop.stopName.includes(';' )){
    stop.showError = true;
    this.saveDisabled = true;
  }else{
    stop.showError = false;
    this.saveDisabled = false;
  }
}
  
}

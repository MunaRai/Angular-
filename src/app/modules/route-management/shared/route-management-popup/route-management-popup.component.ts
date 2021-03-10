import { Component, OnInit, Input } from '@angular/core';
import { Route } from '@shared/models/route.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Stop } from '@shared/models/stops.model';
import { RouteService } from '../../services/route.service';
import { HttpResponse } from '@angular/common/http';
import { ToastService } from '@shared/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MAP_ICON } from '@shared/constants/map-icon.constant';
import { CompileNgModuleMetadata } from '@angular/compiler';
import { CheckPattern } from '@shared/models/check-pattern.model';

@Component({
  selector: 'p2s-route-management-popup',
  templateUrl: './route-management-popup.component.html',
  styleUrls: ['./route-management-popup.component.scss']
})
export class RouteManagementPopupComponent implements OnInit {

  @Input()
  lat = 0;

  @Input()
  lng = 0;

  @Input()
  icon = '';

  mapList:any[]=[];

  route: Route ;

  @Input()
  stop: Stop = new Stop();

  routeForm: FormGroup;

  stopForm: FormGroup;

  selectedFile: any = File;

  mode='add';

  formSubmitted = false;

  checkPattern: CheckPattern = new CheckPattern();

  constructor(
    private fb:FormBuilder,
    private modal: NgbActiveModal,
    private routeService: RouteService,
    private toastrService: ToastService,
    private router : Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    if(this.mode =='add'){
      this.routeForm = this.fb.group({
        routeName: [this.route.routeName,[Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
        routeType: [this.route.routeType, [Validators.required]],
        routeFileFormat: this.route.routeFileFormat,
        stops: this.fb.array([this.buildStopForm()])
      })

    }else{
      this.routeForm = this.fb.group({
        routeName: [this.route.routeName,[Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
        routeType: [this.route.routeType, [Validators.required]],
        routeFileFormat: this.route.routeFileFormat,
        stops: this.route.stops
      })
    }
    
  }

  get stopList() {
    return this.routeForm.get('stops')['controls'];
  }

  get routeName(){
     return this.routeForm.controls.routeName;
  }

  get routeType(){
    return this.routeForm.controls.routeType;
  }

  buildStopForm() {
    return this.fb.group({
      stopName: [this.stop.stopName,[Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
      lat: [this.stop.lat, [Validators.required]],
      lng: [this.stop.lng, [Validators.required]],
    })
  }

  save(){
    if(this.routeForm.getRawValue().routeFileFormat==='csv'){
        this.routeService.addCsv(this.selectedFile)
        .subscribe(data => {
          if(data == null){
            this.toastrService.popError('Error uploading csv file')
          }
          else{
            this.toastrService.popSucces('Csv file Successfully uploaded');
            this.modal.dismiss();
            window.location.reload();
          }
        });       
      }
      else{
        this.formSubmitted= true;
        if(this.routeForm.valid){
          const routeData = this.routeForm.getRawValue();
          this.modal.close(Object.assign({},this.route,routeData));
        }
      }
  }

  dismiss(){
    this.modal.dismiss();
  }

  addStop() {
    const array = this.routeForm.get('stops') as FormArray;
    array.push(this.buildStopForm());
    
    
    
  }

  removeStop(stop) {

    const index = this.mapList.indexOf(stop);
    this.mapList.slice(index,1);
    
    const array = this.routeForm.get('stops') as FormArray;
    array.removeAt(index);

    
    


  }

  selectFile(event) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }


  checkRoutePoints( ){
   this.routeForm.getRawValue().stops.forEach(stop => {
     if(stop.lng != null && !this.mapList.includes(stop)){
       this.mapList.push(stop);
     }else{
       const idx = this.mapList.indexOf(stop);
       this.mapList.slice(idx,1);
     }
   });

    
  }

  redIcon = {
    url: 'assets/img/pin-red.svg',
    // scaledSize: new google.maps.Size(40,40)
  }

  
  optionsRed = {
    markerOptions: {
      suppressMarkers: true,
      icon: this.redIcon
    },
    polylineOptions: {
      strokeColor: 'purple'
    }
  };
}

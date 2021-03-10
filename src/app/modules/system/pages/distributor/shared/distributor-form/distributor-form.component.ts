import { Component, OnInit, Input} from '@angular/core';
import { Distributor } from '@shared/system-models/distributor.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Model } from '@shared/system-models/model.model';
import { User } from '@shared/models/user.model';
import { WizardHeaderItem } from '@shared/components/wizard/wizard-types';
import { ModelService } from '../../../model/service/model.service';
import { CheckPattern } from '@shared/models/check-pattern.model';



@Component({
  selector: 'p2s-distributor-form',
  templateUrl: './distributor-form.component.html',
  styleUrls: ['./distributor-form.component.scss']
})
export class DistributorFormComponent implements OnInit {

  distributor: Distributor = new Distributor()

  @Input()
  userDto: User = new User();

  distributorForm: FormGroup;

  userForm: FormGroup;

  addressForm: FormGroup;
  
  formSubmitted = false;

  showPassword = false;

  mode='add';

  selectedModels:Model[] =[];

  models : Model[] =[];

  checkPattern : CheckPattern = new CheckPattern();

  constructor(
    private fb:FormBuilder,
    private modal: NgbActiveModal,
    private modelService:ModelService
  ){}

  ngOnInit() {
    this.buildForm();
    this.fetchModelNames();
  }

  buildForm(){
    if(this.mode==='add'){
      this.addressForm = this.fb.group({
        street1: [this.userDto.userAddress.street1,[Validators.pattern(this.checkPattern.errorPattern)]],
        street2: [this.userDto.userAddress.street2,[Validators.pattern(this.checkPattern.errorPattern)]],
        city: [this.userDto.userAddress.city, [Validators.required, Validators.maxLength(20), Validators.minLength(3),Validators.pattern(this.checkPattern.errorPattern)]],
        state: [this.userDto.userAddress.state,[Validators.pattern(this.checkPattern.errorPattern)]],
        country: [this.userDto.userAddress.country, [Validators.required]],
        zipCode: this.userDto.userAddress.zipCode
      });

      this.userForm = this.fb.group({
        userFirstName: [this.userDto.userFirstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
        userMiddleName: [this.userDto.userMiddleName,[Validators.pattern(this.checkPattern.errorPattern)]],
        userLastName: [this.userDto.userLastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
        userEmail: [this.userDto.userEmail, [Validators.required, Validators.minLength(10), Validators.maxLength(40), Validators.pattern(this.checkPattern.emailPatternError)]],
        userGender: 'MALE',
        userAddress: this.addressForm,
        userPhone: [this.userDto.userPhone, [Validators.required, Validators.minLength(7), Validators.maxLength(40), Validators.pattern(this.checkPattern.errorPattern)]],
        username: [this.userDto.username, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
        userPassword: [this.userDto.userPassword, [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
      });

      this.distributorForm = this.fb.group({
      distributorName: [this.distributor.distributorName, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
      // distributorModelNumberId: [this.distributor.distributorModelNumberId],
      // distributorModelNumberId: this.fb.array([]),


      userDto: this.userForm,
      });
    }

    else{
      this.addressForm = this.fb.group({
        street1: [this.distributor.userDto.userAddress.street1,[Validators.pattern(this.checkPattern.errorPattern)]],
        street2: [this.distributor.userDto.userAddress.street2,[Validators.pattern(this.checkPattern.errorPattern)]],
        city: [this.distributor.userDto.userAddress.city, [Validators.required, Validators.maxLength(20), Validators.minLength(3),Validators.pattern(this.checkPattern.errorPattern)]],
        state: [this.distributor.userDto.userAddress.state,[Validators.pattern(this.checkPattern.errorPattern)]],
        country: [this.distributor.userDto.userAddress.country, [Validators.required]],
        zipCode: this.distributor.userDto.userAddress.zipCode
      });
  
      this.userForm = this.fb.group({
        userFirstName: [this.distributor.userDto.userFirstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
        userMiddleName: [this.distributor.userDto.userMiddleName,[Validators.pattern(this.checkPattern.errorPattern)]],
        userLastName: [this.distributor.userDto.userLastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
        userEmail: [this.distributor.userDto.userEmail, [Validators.required, Validators.minLength(10), Validators.maxLength(40), Validators.pattern(this.checkPattern.emailPatternError)]],
        userGender: this.distributor.userDto.userGender,
        userAddress: this.addressForm,
        userPhone: [this.distributor.userDto.userPhone, [Validators.required, Validators.minLength(7), Validators.maxLength(40), Validators.pattern(this.checkPattern.errorPattern)]],
        username: [this.distributor.userDto.username, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
        // userPassword: [this.distributor.userDto.userPassword, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      });
  
      this.distributorForm = this.fb.group({
        distributorName: [this.distributor.distributorName, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(this.checkPattern.errorPattern)]],
        // distributorModelNumberId: [this.distributor.distributorModelNumberId],
        // distributorModelNumberId: this.fb.array([]),
        userDto: this.userForm,
    });
  }

} 


  fetchModelNames() {
    this.modelService.getAllModelNames()
      .subscribe(
        ({result}) => {
          this.models = result;
        },
        error => {
          console.error('Error while fetching model names', error);
        }
      );
  }


  close() {
    this.modal.close();
  }

  cancel() {
    this.modal.dismiss();
  }


  save(){
    this.formSubmitted = true;
    if (this.distributorForm.valid) {
      const distributorData = this.distributorForm.getRawValue();
      this.modal.close(Object.assign({}, this.distributor, distributorData));
    }
  }


  get distributorName(){
    return this.distributorForm.controls.distributorName;
  }

  // get distributorModelNumberId(){
  //   return this.distributorForm.controls.distributorModelNumberId;
  // }


  get userFirstName() {
    return this.userForm.controls.userFirstName;
  }

  get userMiddleName() {
    return this.userForm.controls.userMiddleName;
  }

  get userLastName() {
    return this.userForm.controls.userLastName;
  }

  get userEmail() {
    return this.userForm.controls.userEmail;
  }
  
  get userPhone(){
    return this.userForm.controls.userPhone;
  }

  get userGender(){
    return this.userForm.controls.userGender;
  }
  
  get username() {
    return this.userForm.controls.username;
  }

  get userPassword() {
    return this.userForm.controls.userPassword;
  }


  wizardHeadings: WizardHeaderItem[] = [
    {
      heading: 'Distributor Details',
      icon: 'fa-user',
      subHeading: ''
    },
    {
      heading: 'Personal Details',
      icon: 'fa-address-card',
      subHeading: ''
    },
    {
      heading: 'Credentials',
      icon: 'fa-key',
      subHeading: ''
    },
  ];

  onPrev(event) {
  }

  onNext(event) {
  }

  onComplete(event) {
    this.save();
  }
}




import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '../../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '../../../../../../../node_modules/@angular/forms';
import { Reminder } from '@shared/models/reminder.model';

@Component({
  selector: 'p2s-generate-reminder-popup',
  templateUrl: './generate-reminder-popup.component.html',
  styleUrls: ['./generate-reminder-popup.component.scss']
})
export class GenerateReminderPopupComponent implements OnInit {

  mode = 'add';

  showDistanceControls = false;

  showDateControls = false;

  showEngineHoursControls = false;

  reminderForm: FormGroup;

  formSubmitted = false;

  reminder: Reminder = new Reminder();

  // basedOn: string[] = ['DATE', 'DISTANCE', 'ENGINE_HOURS'];

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    // this.reminderForm.controls['reminderBasedOn'].valueChanges
    //   .subscribe(current => {
    //     this.showDateControls = current === 'date';
    //     this.showDistanceControls = current === 'distance';
    //     this.showEngineHoursControls = current === 'enginehours';
    //   });

  }

  buildForm() {
    if (this.mode === 'add') {
      this.reminderForm = this.fb.group({
        reminderSubject: [this.reminder.reminderSubject],
        reminderBody: [this.reminder.reminderBody],
        fromDate: this.reminder.fromDate,
        toDate:this.reminder.toDate,
        fromTime: this.reminder.fromTime,
        toTime: this.reminder.toTime,
      });
    } else {
      this.reminderForm = this.fb.group({
      reminderSubject: [this.reminder.reminderSubject],
      reminderBody: [this.reminder.reminderBody],
      });
    }
  }

  save() {
    this.formSubmitted = true;
    if (this.reminderForm.valid) {
      const reminderData = this.reminderForm.getRawValue();
      const fromDate = (new Date(this.reminderForm.getRawValue().fromDate+'T'+this.reminderForm.getRawValue().fromTime));
      const reminderStartDate = fromDate.getTime();

      const toDate = (new Date(this.reminderForm.getRawValue().toDate+'T'+this.reminderForm.getRawValue().toTime));
      const reminderEndDate = toDate.getTime();
      reminderData.reminderStartDate = fromDate.getTime();
      reminderData.reminderEndDate = toDate.getTime();

      
      this.modal.close(Object.assign({}, this.reminder, reminderData));
    }
  }

  dismiss() {
    this.modal.dismiss();
  }

  get email() {
    return this.reminderForm.controls.email;
  }
}

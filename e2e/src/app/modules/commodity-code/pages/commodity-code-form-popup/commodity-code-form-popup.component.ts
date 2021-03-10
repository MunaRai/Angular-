import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommodityCode } from '@shared/models/commodity-code.model';

@Component({
  selector: 'p2s-commodity-code-form-popup',
  templateUrl: './commodity-code-form-popup.component.html',
  styleUrls: ['./commodity-code-form-popup.component.scss']
})
export class CommodityCodeFormPopupComponent implements OnInit {

  commodityCode: CommodityCode = new CommodityCode();

  commodityCodeForm: FormGroup;

  mode = 'add';

  formSubmitted = false;

  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.commodityCodeForm = this.fb.group({
      commodityCode: [this.commodityCode.commodityCode, Validators.required],
      commodityCodeDescription: [this.commodityCode.commodityCodeDescription, Validators.required]
    });
  }

  save() {
    this.formSubmitted = true;
    if (this.commodityCodeForm.valid) {
      this.modal.close(this.commodityCodeForm.getRawValue());
    }
  }

  cancel() {
    this.modal.dismiss();
  }


  
}

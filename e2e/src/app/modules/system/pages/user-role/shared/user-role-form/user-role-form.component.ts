import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRole } from '@shared/system-models/user-role.model';
import { CheckPattern } from '@shared/models/check-pattern.model';

@Component({
  selector: 'p2s-user-role-form',
  templateUrl: './user-role-form.component.html',
  styleUrls: ['./user-role-form.component.scss']
})
export class UserRoleFormComponent implements OnInit {

@Input()
userRole: UserRole = new UserRole();

  mode='add';

  userRoleForm: FormGroup;
  
  formSubmitted = false;

  checkPattern : CheckPattern = new CheckPattern();

  constructor(
    private fb:FormBuilder,
    private modal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.userRoleForm = this.fb.group({
      roleId: this.userRole.roleId,  
      roleName: [this.userRole.roleName, [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern(this.checkPattern.errorPattern)]],
      roleCode:[this.userRole.roleCode, [Validators.required, Validators.minLength(2), Validators.maxLength(5), Validators.pattern(this.checkPattern.errorPattern)]],
    });
  }

  
  close() {
    this.modal.close();
  }

  dismiss() {
    this.modal.dismiss();
  }

  save(){
    this.formSubmitted = true;
    if (this.userRoleForm.valid) {
      const userRole = this.userRoleForm.getRawValue();
      userRole.roleName = (userRole.roleName);
      userRole.roleCode = (userRole.roleCode);
      
      this.modal.close(Object.assign({}, this.userRole, userRole));
    }
  }

  get roleName() {
    return this.userRoleForm.controls.roleName;
  }

  get roleCode() {
    return this.userRoleForm.controls.roleCode;
  }
}

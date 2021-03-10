import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Helper, convertDateFormat } from '@shared/helpers/helper';
import { Expense } from '@shared/models/expense.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { format } from 'date-fns';
@Component({
  selector: 'p2s-add-expense-popup',
  templateUrl: './add-expense-popup.component.html',
  styleUrls: ['./add-expense-popup.component.scss']
})
export class AddExpensePopupComponent implements OnInit {

  expenseForm: FormGroup;

  today: any = new Date();

  expenseType: string[] = ['Fuel', 'Food', 'Toll Tax', 'Insurance', 'Driver salary', 'Maintainance'];

  formSubmitted = false;


                                                                                                                                                                                                     
  constructor(
    private modal: NgbActiveModal,
    private fb: FormBuilder,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private helper: Helper
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.expenseForm = this.fb.group({
      expenseDate: '',
      remarks: '',
      expenses: this.fb.array([this.buildExpenseForm()])
    });
  }

  get expenseList() {
    return this.expenseForm.get('expenses')['controls'];
  }

  buildExpenseForm() {
    return this.fb.group({
      expenseType: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ],
      expenseAmount: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
      ]
    });
  }

  save() {
    this.formSubmitted = true;
    if (this.expenseForm.valid) {
      const expenseData = this.expenseForm.getRawValue();
      // const formattedDate = (expenseData.expenseDate);
      const formattedDate = ((expenseData.expenseDate).getTime());
      const data: Expense[] = expenseData.expenses.map(exp => {
        return new Expense(exp.expenseType, exp.expenseAmount, formattedDate, expenseData.remarks);
      });
      this.modal.close(data);
    }
  }

  cancel() {
    this.modal.dismiss();
  }

  addExpense() {
    const array = this.expenseForm.get('expenses') as FormArray;
    array.push(this.buildExpenseForm());
  }

  removeExpense(index) {
    const array = this.expenseForm.get('expenses') as FormArray;
    array.removeAt(index);
  }
  
  expenseTypeSelected(type) {
  }
}

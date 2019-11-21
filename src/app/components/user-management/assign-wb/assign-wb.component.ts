import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-assign-wb',
  templateUrl: './assign-wb.component.html',
  styleUrls: ['./assign-wb.component.css']
})
export class AssignWbComponent {
  @Output() previousRoleTab: EventEmitter<string> = new EventEmitter<string>();
  WBGroup: FormGroup;
  wbList = Array<{ wbId: number, wbName: string }>();

  constructor(private formBuilder: FormBuilder) {
    this.getWb();
    this.WBGroup = this.formBuilder.group({
      wbs: new FormArray([]),
      priority: new FormArray([])
    });
    this.addCheckboxes();
  }
  // minSelectedCheckboxes(min = 1) {
  //   const validator: ValidatorFn = (formArray: FormArray) => {
  //     const totalSelected = formArray.controls
  //       // get a list of checkbox values (boolean)
  //       .map(control => control.value)
  //       // total up the number of checked checkboxes
  //       .reduce((prev, next) => next ? prev + next : prev, 0);

  //     // if the total is not greater than the minimum, return the error message
  //     return totalSelected >= min ? null : { required: true };
  //   };

  //   return validator;
  // }
  addCheckboxes() {
    this.wbList.forEach((o, i) => {
      const control = new FormControl(); // if first item set to true, else false
      (this.WBGroup.controls.wbs as FormArray).push(control);
    });
  }

  getWb() {
    this.wbList = [
      { wbId: 1, wbName: 'Missing Member WB' },
      { wbId: 2, wbName: 'Alternate Pricing WB' },
      { wbId: 3, wbName: 'COB WB' },
      { wbId: 4, wbName: 'High $ WB' },
      { wbId: 5, wbName: 'Non-Payment of Premiums WB' },
      { wbId: 6, wbName: 'Missing Provider WB' },
    ];
  }
  submit() {
    debugger
    const priority = this.WBGroup.get('priority').value;
    this.WBGroup.get('priority').setValue(priority);

    const selectedWBIds = this.WBGroup.value.wbs
      .map((v, i) => v ? this.wbList[i].wbId : null)
      .filter(v => v !== null);
    console.log(selectedWBIds);

    const selectedWBNames = this.WBGroup.value.wbs
      .map((v, i) => v ? this.wbList[i].wbName : null)
      .filter(v => v !== null);
    console.log(selectedWBNames);

    // const selectedPriorities = this.WBGroup.value.wbs
    //   .map((v, i) => v ? this.wbList[i].priority : null)
    //   .filter(v => v !== null);
    // console.log(selectedPriorities);
    console.log(this.WBGroup.get('priority').get(priority));
  }
  previousPage() {
    this.previousRoleTab.emit('ASSIGN_ROLE');
  }
}
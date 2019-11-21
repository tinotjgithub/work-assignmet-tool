
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { BasicInfoService } from './../services/basic-info.service';
import { BasicInfoModel } from './../basic-info/basic-info.model';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.css'],
  providers: [BasicInfoService, BasicInfoModel]
})
export class AssignRolesComponent implements OnInit {
  @Output() nextRoleTab: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousBasicTab: EventEmitter<string> = new EventEmitter<string>();
  basicInfo: BasicInfoModel;
  roleGroup: FormGroup;
  rolesList = Array<{ roleId: number, roleName: string }>();

  constructor(private formBuilder: FormBuilder, private basicInfoService: BasicInfoService) {
    this.getRoles();
    this.roleGroup = this.formBuilder.group({
      roles: new FormArray([])
    });
    this.addCheckboxes();
  }

  ngOnInit() {
    this.basicInfo = this.basicInfoService.getBasicInfo();
    this.basicInfoService.updateBasicInfoListener().subscribe((basicInfoDetails: any) => {
      this.basicInfo = basicInfoDetails;
    });
  }

  addCheckboxes() {
    this.rolesList.forEach((o, i) => {
      const control = new FormControl(); // if first item set to true, else false
      (this.roleGroup.controls.roles as FormArray).push(control);
    });
  }

  getRoles() {
    this.rolesList = [
      { roleId: 1, roleName: 'Processor' },
      { roleId: 2, roleName: 'Auditor' },
      { roleId: 3, roleName: 'Lead' },
      { roleId: 4, roleName: 'Manager' },
    ];
  }
  submit() {
    const selectedRoleIds = this.roleGroup.value.roles
      .map((v, i) => v ? this.rolesList[i].roleId : null)
      .filter(v => v !== null);
    console.log(selectedRoleIds);
    this.nextRoleTab.emit('WB');
  }
  previousPage() {
    this.previousBasicTab.emit('INFO');
  }
}
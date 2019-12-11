
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { UserMgtService } from './../services/user-management.service';
import { BasicInfoModel } from './../basic-info/basic-info.model';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.css'],
  providers: [UserMgtService, BasicInfoModel]
})
export class AssignRolesComponent implements OnInit {
  @Output() nextRoleTab: EventEmitter<string> = new EventEmitter<string>();
  @Output() previousBasicTab: EventEmitter<string> = new EventEmitter<string>();
  basicInfo: BasicInfoModel;
  roleGroup: FormGroup;
  rolesList = Array<{ roleId: number, roleName: string }>();
  submitted: boolean = false;
  inValid: boolean = false;
  isValidForm: boolean = true;
  constructor(private formBuilder: FormBuilder, private userMgtService: UserMgtService) {
    this.getRoles();
    this.roleGroup = this.formBuilder.group({
      roles: new FormArray([], [Validators.required])
    });
    this.addCheckboxes();
  }
  get rol() { return this.roleGroup.controls; }
  ngOnInit() {
    this.rebuildForm();
    this.basicInfo = this.userMgtService.getBasicInfo();
    this.userMgtService.updateBasicInfoListener().subscribe((basicInfoDetails: any) => {
      this.basicInfo = basicInfoDetails;
    });
  }

  roleChange(e) {
    this.inValid = this.validateRoles();
    if (this.inValid) {
      return;
    }
  }

  rebuildForm() {
    let savedInfo = [];
    savedInfo.push(this.userMgtService.getRoleIDs());
    if (savedInfo && savedInfo[0]) {
      let savedInformation = savedInfo[0];
      let formArr = <FormArray>this.roleGroup.controls.roles;
      for (var i = 0; i < savedInformation.length; i++) {
        for (var j = i; j <= this.roleGroup.controls.roles.value.length; j++) {
          if (j === savedInformation[i]) {
            formArr.at(j - 1).setValue(true);
          }
        }
      }
    }
  }

  addCheckboxes() {
    this.rolesList.forEach((o, i) => {
      const control = new FormControl(); // if first item set to true, else false
      (this.roleGroup.controls.roles as FormArray).push(control);
    });
  }

  validateRoles(): boolean {
    let valid = false;
    this.isValidForm = false;
    let formArr = <FormArray>this.roleGroup.controls.roles;
    for (var i = 0; i < formArr.length; i++) {
      if (formArr.at(i).value === true) {
        this.isValidForm = true;
      }
    }
    valid = !this.isValidForm ? true : false;
    return valid;
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
    this.submitted = true;
    this.inValid = this.validateRoles();
    if (this.inValid) {
      return;
    } else {
      const selectedRoleIds = this.roleGroup.value.roles
        .map((v, i) => v ? this.rolesList[i].roleId : null)
        .filter(v => v !== null);
      this.userMgtService.saveRoleIDs(selectedRoleIds);
      this.nextRoleTab.emit('WB');
    }
  }
  previousPage() {
    this.previousBasicTab.emit('INFO');
  }
}
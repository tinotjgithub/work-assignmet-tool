
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
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
  constructor(private formBuilder: FormBuilder, private basicInfoService: UserMgtService) {
    this.getRoles();
    this.roleGroup = this.formBuilder.group({
      roles: new FormArray([])
    });
    this.addCheckboxes();
  }

  ngOnInit() {
    // this.rebuildForm();
    this.basicInfo = this.basicInfoService.getBasicInfo();
    this.basicInfoService.updateBasicInfoListener().subscribe((basicInfoDetails: any) => {
      this.basicInfo = basicInfoDetails;
    });
  }
  // rebuildForm() {
  //   let savedInfo = [];
  //   savedInfo = this.basicInfoService.getRoleIDs();
  //   if (savedInfo && savedInfo.length > 0) {
  //     for (var i = 0; i < savedInfo.length; i++) {
  //       // debugger
  //       // let index = savedInfo[i];
  //       // let a = this.roleGroup.value.roles[index];
  //       // let p = this.roleGroup.get('roles');
  //       // this.roleGroup.get(roles[a]).setValue(true);
  //     }
  //   }
  // }
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
    this.submitted = true;
    const selectedRoleIds = this.roleGroup.value.roles
      .map((v, i) => v ? this.rolesList[i].roleId : null)
      .filter(v => v !== null);
    this.basicInfoService.saveRoleIDs(selectedRoleIds);
    this.nextRoleTab.emit('WB');
  }
  previousPage() {
    this.previousBasicTab.emit('INFO');
  }
}
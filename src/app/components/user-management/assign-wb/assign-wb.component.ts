import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { UserMgtService } from './../services/user-management.service';
import { AssignRolesModel } from './../assign-roles/assign-roles.model';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { AssignWBsModel } from './../assign-wb/assign-wb.model';

@Component({
  selector: 'app-assign-wb',
  templateUrl: './assign-wb.component.html',
  styleUrls: ['./assign-wb.component.css'],
  providers: [UserMgtService, AssignRolesModel]
})
export class AssignWbComponent {
  @Output() previousRoleTab: EventEmitter<string> = new EventEmitter<string>();
  WBGroup: FormGroup;
  roleIDs: AssignRolesModel;
  basicInfo: BasicInfoModel;
  assignWbs: AssignWBsModel;
  constructor(private formBuilder: FormBuilder, private userMgtService: UserMgtService) {
    this.getWb();
    this.WBGroup = this.formBuilder.group({
      wbs: new FormArray([]),
      // priority: new FormArray([])
    });
    this.addCheckboxes();
  }


  ngOnInit() {
    // this.rebuildForm();
    this.roleIDs = this.userMgtService.getRoleIDs();
    this.userMgtService.updateRoleIDsListener().subscribe((roleIds: any) => {
      this.roleIDs = roleIds;
    });
    this.basicInfo = this.userMgtService.getBasicInfo();
    this.userMgtService.updateBasicInfoListener().subscribe((basicInfo: any) => {
      this.basicInfo = basicInfo;
    });
  }

  addCheckboxes() {
    this.wbList.forEach((o, i) => {
      const control = new FormControl();
      (this.WBGroup.controls.wbs as FormArray).push(control);
    });
  }

  getWb() {
    this.wbList = [
      { wbId: 1, wbName: 'Missing Member WB', priority: null },
      { wbId: 2, wbName: 'Alternate Pricing WB', priority: null },
      { wbId: 3, wbName: 'COB WB', priority: null },
      { wbId: 4, wbName: 'High $ WB', priority: null },
      { wbId: 5, wbName: 'Non-Payment of Premiums WB', priority: null },
      { wbId: 6, wbName: 'Missing Provider WB', priority: null },
    ];
  }

  submit() {
    let wBasket = [];
    const selectedWBIds = this.WBGroup.value.wbs
      .map((v, i) => v ? this.wbList[i].wbId : null)
      .filter(v => v !== null);

    if (selectedWBIds) {
      for (var i = 0; i < selectedWBIds.length; i++) {
        wBasket.push(this.wbList.filter(wb => wb.wbId === selectedWBIds[i]));
      }
      // wBasket.forEach(w => {
      //   workBasket['wbId'].push(w.wbId);
      //   workBasket['priority'].push(w.priority);
      // });
      console.log(wBasket)
    }

    this.userMgtService.saveWBs(wBasket);
    this.assignWbs = this.userMgtService.getWBs();
    this.userMgtService.updateWBsListener().subscribe((assignWbs: any) => {
      this.assignWbs = assignWbs;
    });
    this.createFinalOnject();
  }

  createFinalOnject() {
    const finalObject = [{
      "firstName": this.basicInfo.firstName,
      "lastName": this.basicInfo.lastName,
      "userID": this.basicInfo.userID,
      "primaryEmail": this.basicInfo.primaryEmail,
      "effectiveFrom": this.basicInfo.effectiveFrom,
      "terminationDate": this.basicInfo.terminationDate,
      "resourceSkillset": this.basicInfo.resourceSkillset,
      "loggedInUser": "Santhosh",
      "roleId": this.roleIDs,
      "workBasketId": this.assignWbs
    }];
    return finalObject;
  }


  previousPage() {
    this.previousRoleTab.emit('ASSIGN_ROLE');
  }

  onChange(txtId) {
    for (var i = 0; i < this.wbList.length; i++) {
      if (txtId.id === i.toString()) {
        if (i !== 0)
          this.wbList[i - 1].priority = txtId.value;
        else
          this.wbList[0].priority = txtId.value;
      }
    }
  }
}
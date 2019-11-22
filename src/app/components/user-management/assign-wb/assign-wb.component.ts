import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { UserMgtService } from './../services/user-management.service';
import { AssignRolesModel } from './../assign-roles/assign-roles.model';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { AssignWBsModel } from './../assign-wb/assign-wb.model';
import { BaseHttpService } from "./../../../services/base-http.service";
import { ToastService } from './../../../services/toast.service';

@Component({
  selector: 'app-assign-wb',
  templateUrl: './assign-wb.component.html',
  styleUrls: ['./assign-wb.component.css'],
  providers: [UserMgtService, BaseHttpService, AssignRolesModel, ToastService]
})
export class AssignWbComponent {
  @Output() previousRoleTab: EventEmitter<string> = new EventEmitter<string>();
  WBGroup: FormGroup;
  roleIDs: AssignRolesModel;
  basicInfo: BasicInfoModel;
  assignWbs: AssignWBsModel;
  saveResponse: any;
  wbList = Array<{ wbId: number, wbName: string, priority: number }>();
  constructor(private formBuilder: FormBuilder, public toastService: ToastService, private userMgtService: UserMgtService, public baseHTTPService: BaseHttpService) {
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

  saveToService(finalObject: any) {
    console.log("finalObject: ", finalObject);
    this.baseHTTPService
      .post(finalObject, "api/user-management/create-users")
      .subscribe(data => {
        this.saveResponse = data;
        console.log(this.saveResponse);
      });
    this.showSuccess();
  }

  addCheckboxes() {
    this.wbList.forEach((o, i) => {
      const control = new FormControl();
      (this.WBGroup.controls.wbs as FormArray).push(control);
    });
  }
  showStandard() {
    this.toastService.show('I am a standard toast', {
      delay: 2000,
      autohide: true
    });
  }

  showSuccess() {
    this.toastService.show('user details saved sucessfully.', {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
      headertext: 'Success!'
    });
  }

  showError() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-danger text-light',
      delay: 2000,
      autohide: true,
      headertext: 'Error!!!'
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
    let wbListed = [];
    const selectedWBIds = this.WBGroup.value.wbs
      .map((v, i) => v ? this.wbList[i].wbId : null)
      .filter(v => v !== null);

    if (selectedWBIds) {
      for (var i = 0; i < selectedWBIds.length; i++) {
        wBasket.push(this.wbList.filter(wb => wb.wbId === selectedWBIds[i])[0]);
      }
    }
    let WB = []
    for (i = 0; i < wBasket.length; i++) {
      WB.push({
        workBasketID: wBasket[i].wbId,
        priority: wBasket[i].priority
      });
    }
    this.userMgtService.saveWBs(WB);
    this.assignWbs = this.userMgtService.getWBs();
    this.userMgtService.updateWBsListener().subscribe((assignWbs: any) => {
      this.assignWbs = assignWbs;
    });
    this.createFinalOnject();
  }

  createFinalOnject() {
    const formattedDate = this.basicInfo.effectiveFrom.day + '-' + this.basicInfo.effectiveFrom.month + '-' + this.basicInfo.effectiveFrom.year;
    const finalObject = [{
      "firstName": this.basicInfo.firstName,
      "lastName": this.basicInfo.lastName,
      "userID": this.basicInfo.userID,
      "primaryEmail": this.basicInfo.primaryEmail,
      "effectiveFrom": formattedDate,
      "terminationDate": this.basicInfo.terminationDate,
      "resourceSkillset": this.basicInfo.resourceSkillset,
      "loggedInUser": "Santhosh",
      "roleId": this.roleIDs,
      "userWorkBasketRequestDtos": this.assignWbs
    }];
    this.saveToService(finalObject[0]);
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
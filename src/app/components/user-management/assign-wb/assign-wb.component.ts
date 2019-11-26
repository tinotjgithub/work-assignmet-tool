import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { UserMgtService } from './../services/user-management.service';
import { AssignRolesModel } from './../assign-roles/assign-roles.model';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { AssignWBsModel } from './../assign-wb/assign-wb.model';
import { BaseHttpService } from "./../../../services/base-http.service";
import { Router } from "@angular/router";
import { AppComponent } from './../../../app.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assign-wb',
  templateUrl: './assign-wb.component.html',
  styleUrls: ['./assign-wb.component.css'],
  providers: [UserMgtService, BaseHttpService, AssignRolesModel]
})
export class AssignWbComponent {
  @Output() previousRoleTab: EventEmitter<string> = new EventEmitter<string>();
  WBGroup: FormGroup;
  roleIDs: AssignRolesModel;
  basicInfo: BasicInfoModel;
  assignWbs: AssignWBsModel;
  saveResponse: any;
  wbList = Array<{ wbId: number, wbName: string, priority: number }>();
  constructor(public datepipe: DatePipe, private app: AppComponent, private formBuilder: FormBuilder, private router: Router, private userMgtService: UserMgtService, public baseHTTPService: BaseHttpService) {
    this.getWb();
    this.WBGroup = this.formBuilder.group({
      wbs: new FormArray([])
    });
    this.addCheckboxes();
  }


  ngOnInit() {
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
    this.baseHTTPService
      .post(finalObject, "api/user-management/create-user")
      .subscribe(data => {
        this.saveResponse = data;
      });
    this.app.showSuccess("User Details saved successfully!!", "SUCCESS");
    setTimeout(function () {
      this.router.navigate(['/LandingPage']);
    }.bind(this), 2100);
    this.resetAll();
  }

  resetAll() {
    let basicInfo = {
      firstName: '',
      lastName: '',
      userID: '',
      primaryEmail: '',
      effectiveFrom: { day: '', month: '', year: '' },
      terminationDate: '',
      resourceSkillset: '',
      loggedInUser: ''
    }
    let roleIds = {
      roleId: []
    }
    let wbs = { userWorkBasketRequestDtos: { wbId: '', priority: '' } }
    this.userMgtService.saveBasicInfo(basicInfo);
    this.userMgtService.saveRoleIDs(roleIds);
    this.userMgtService.saveWBs(wbs);
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
    const formattedDate = this.basicInfo.effectiveFrom.year + '-' + this.basicInfo.effectiveFrom.month + '-' + this.basicInfo.effectiveFrom.day;
    const finalObject = [{
      "firstName": this.basicInfo.firstName,
      "lastName": this.basicInfo.lastName,
      "userID": this.basicInfo.userID,
      "primaryEmail": this.basicInfo.primaryEmail,
      "effectiveFrom": this.datepipe.transform(formattedDate, 'yyyy-MM-dd'),
      "terminationDate": this.basicInfo.terminationDate,
      "resourceSkillset": this.basicInfo.resourceSkillset,
      "loggedInUser": "Santhosh",
      "roleId": this.roleIDs,
      "userWorkBasketRequestDtos": this.assignWbs
    }];
    console.log("finalObject: ", finalObject[0]);
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
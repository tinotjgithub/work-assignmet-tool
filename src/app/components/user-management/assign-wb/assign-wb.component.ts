import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { UserMgtService } from './../services/user-management.service';
import { AssignRolesModel } from './../assign-roles/assign-roles.model';
import { BasicInfoModel } from './../basic-info/basic-info.model';
import { AssignWBsModel } from './../assign-wb/assign-wb.model';
import { Router } from "@angular/router";
import { AppComponent } from './../../../app.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assign-wb',
  templateUrl: './assign-wb.component.html',
  styleUrls: ['./assign-wb.component.css']
})
export class AssignWbComponent {
  @Output() previousRoleTab: EventEmitter<string> = new EventEmitter<string>();
  WBGroup: FormGroup;
  roleIDs: AssignRolesModel;
  basicInfo: BasicInfoModel;
  assignWbs: AssignWBsModel;
  submitted: boolean = false;
  inValid: boolean = false;
  wbRequired: boolean = false;
  priorityRequired: boolean = false;
  saveResponse: any;
  isValidForm: boolean = true;
  wbList = Array<{ wbId: number, wbName: string, priority: string, selected: boolean }>();
  // wbListSelected = Array<{ wbId: number, wbName: string, priority: number }>();
  constructor(public datepipe: DatePipe, private app: AppComponent, private formBuilder: FormBuilder, private router: Router, private userMgtService: UserMgtService) {
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
    this.userMgtService.saveUser(finalObject);
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
      // userID: '',
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
      { wbId: 1, wbName: 'Missing Member WB', priority: null, selected: false },
      { wbId: 2, wbName: 'Alternate Pricing WB', priority: null, selected: false },
      { wbId: 3, wbName: 'COB WB', priority: null, selected: false },
      { wbId: 4, wbName: 'High $ WB', priority: null, selected: false },
      { wbId: 5, wbName: 'Non-Payment of Premiums WB', priority: null, selected: false },
      { wbId: 6, wbName: 'Missing Provider WB', priority: null, selected: false },
    ];
  }

  //at least 1 wb required 
  validateWb(): boolean {
    let inValid = true;
    for (var i = 0; i < this.wbList.length; i++) {
      if (this.wbList[i].selected === true) {
        inValid = false;
      }
    }
    return inValid;
  }

  //priority required for selected ones
  validatePriority(): boolean {
    let inValid = false;
    for (var i = 0; i < this.wbList.length; i++) {
      if (this.wbList[i].selected === true && (this.wbList[i].priority === null || this.wbList[i].priority === '') ){
        inValid = true;
      }
    }
    return inValid;
  }


  submit() {
    this.submitted = true;
    this.wbRequired = this.validateWb();
    this.priorityRequired = this.validatePriority();
    this.inValid = (this.wbRequired || this.priorityRequired) ? true : false;
    if (this.inValid) {
      return;
    } else {
      let WB = [];
      if (this.wbList && this.wbList.length > 0) {
        for (var i = 0; i < this.wbList.length; i++) {
          if (this.wbList[i].selected) {
            WB.push({
              workBasketID: this.wbList[i].wbId,
              priority: this.wbList[i].priority
            });
          }
        }
      }
      this.userMgtService.saveWBs(WB);
      this.assignWbs = this.userMgtService.getWBs();
      this.userMgtService.updateWBsListener().subscribe((assignWbs: any) => {
        this.assignWbs = assignWbs;
      });
      this.createFinalOnject();
    }
  }

  createFinalOnject() {
    const formattedDate = this.basicInfo.effectiveFrom.year + '-' + this.basicInfo.effectiveFrom.month + '-' + this.basicInfo.effectiveFrom.day;
    const finalObject = [{
      "firstName": this.basicInfo.firstName,
      "lastName": this.basicInfo.lastName,
      // "userID": this.basicInfo.userID,
      "primaryEmail": this.basicInfo.primaryEmail,
      "effectiveFrom": this.datepipe.transform(formattedDate, 'yyyy-MM-dd'),
      "terminationDate": this.basicInfo.terminationDate,
      "resourceSkillset": this.basicInfo.resourceSkillset,
      "loggedInUser": "Santhosh",
      "roleId": this.roleIDs,
      "userWorkBasketRequestDtos": this.assignWbs
    }];
    console.log(finalObject[0]);
    this.saveToService(finalObject[0]);
  }

  previousPage() {
    this.previousRoleTab.emit('ASSIGN_ROLE');
  }

  onRowSelect(event) {
    this.wbList.filter((wb) => {
      if (wb.wbId === event.data.wbId) {
        wb.wbId = event.data.wbId;
        wb.wbName = event.data.wbName;
        wb.priority = event.data.priority;
        wb.selected = true;
      }
    })
    this.wbRequired = this.validateWb();
    this.inValid = this.wbRequired  ? true : false;
    // this.wbListSelected.push({ wbId: event.data.wbId, wbName: event.data.wbName, priority: event.data.priority });
  }

  onRowUnselect(event) {
    this.wbList.filter((wb) => {
      if (wb.wbId === event.data.wbId) {
        wb.wbId = event.data.wbId;
        wb.wbName = event.data.wbName;
        wb.priority = event.data.priority;
        wb.selected = false;
      }
    })
    this.wbRequired = this.validateWb();
    this.inValid = this.wbRequired  ? true : false;
    // this.wbListSelected.push({ wbId: event.data.wbId, wbName: event.data.wbName, priority: event.data.priority });
  }

  onChange(txtId, i) {
    this.wbList[i - 1].priority = txtId.value;
    this.priorityRequired = this.validatePriority();
    this.inValid = this.priorityRequired  ? true : false;
  }
}
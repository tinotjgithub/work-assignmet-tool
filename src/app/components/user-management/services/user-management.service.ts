import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { BasicInfoModel } from '../basic-info/basic-info.model';
import { AssignRolesModel } from './../assign-roles/assign-roles.model';
import { AssignWBsModel } from './../assign-wb/assign-wb.model';
import { BaseHttpService } from "./../../../services/base-http.service";

@Injectable({ providedIn: "root" })
export class UserMgtService {
    public static basicInfoDetails: BasicInfoModel;
    public static roleIDs: AssignRolesModel;
    public static wbs: AssignWBsModel;
    constructor(private http: HttpClient, private router: Router, public baseHTTPService: BaseHttpService) { }
    private updateBasicInfo = new Subject<BasicInfoModel>();
    private updateRoleIDs = new Subject<AssignRolesModel>();
    private updateWBs = new Subject<AssignWBsModel>();

    updateBasicInfoListener() {
        return this.updateBasicInfo.asObservable();
    }

    updateRoleIDsListener() {
        return this.updateRoleIDs.asObservable();
    }

    updateWBsListener() {
        return this.updateBasicInfo.asObservable();
    }

    saveBasicInfo(basicInfo) {
        UserMgtService.basicInfoDetails = basicInfo;
        this.updateBasicInfo.next(UserMgtService.basicInfoDetails);
    }

    saveRoleIDs(roleIds) {
        UserMgtService.roleIDs = roleIds;
        this.updateRoleIDs.next(UserMgtService.roleIDs);
    }

    saveWBs(wbs) {
        UserMgtService.wbs = wbs;
        this.updateWBs.next(UserMgtService.wbs);
    }

    getBasicInfo() {
        return UserMgtService.basicInfoDetails;
    }

    getRoleIDs() {
        return UserMgtService.roleIDs;
    }

    getWBs() {
        return UserMgtService.wbs;
    }

  saveUser(finalObject) {
    this.baseHTTPService.post(finalObject, "api/user-management/create-user").subscribe(
      data => {
        console.log(data);
      },
      error => {
        // alert("Something Went Wrong");
      }
    );
  }
}

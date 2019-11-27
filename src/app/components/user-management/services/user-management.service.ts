import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { BasicInfoModel } from '../basic-info/basic-info.model';
import { AssignRolesModel } from './../assign-roles/assign-roles.model';
import { AssignWBsModel } from './../assign-wb/assign-wb.model';

@Injectable({ providedIn: "root" })
export class UserMgtService {
    public basicInfoDetails: BasicInfoModel;
    public roleIDs: AssignRolesModel;
    public wbs: AssignWBsModel;
    constructor(private http: HttpClient, private router: Router) { }
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
        this.basicInfoDetails = basicInfo;
        this.updateBasicInfo.next(this.basicInfoDetails);
    }

    saveRoleIDs(roleIds) {
        this.roleIDs = roleIds;
        this.updateRoleIDs.next(this.roleIDs);
    }

    saveWBs(wbs) {
        this.wbs = wbs;
        this.updateWBs.next(this.wbs);
    }

    getBasicInfo() {
        return this.basicInfoDetails;
    }

    getRoleIDs() {
        return this.roleIDs;
    }

    getWBs() {
        return this.wbs;
    }
}

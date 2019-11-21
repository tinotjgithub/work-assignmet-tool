import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { BasicInfoModel } from '../basic-info/basic-info.model';

@Injectable({ providedIn: "root" })
export class BasicInfoService {
    public static basicInfoDetails: BasicInfoModel;
    private authToken: string;
    constructor(private http: HttpClient, private router: Router) { }
    private updateBasicInfo = new Subject<BasicInfoModel>();

    updateBasicInfoListener() {
        return this.updateBasicInfo.asObservable();
    }

    saveBasicInfo(basicInfo) {
        BasicInfoService.basicInfoDetails = basicInfo;
        this.updateBasicInfo.next(BasicInfoService.basicInfoDetails);
    }

    getBasicInfo() {
        return BasicInfoService.basicInfoDetails;
    }
}

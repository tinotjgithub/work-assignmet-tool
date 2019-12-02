import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { isNgTemplate } from "@angular/compiler";
import { BaseHttpService } from "../base-http.service";

@Injectable({
  providedIn: "root"
})
export class ReportService {
  private reportExistSub = new Subject<boolean>();
  private currentReportFiltersSubject = new Subject<any>();
  private myReportsIdsSub = new Subject<any>();

  currentReportId: any;
  myReportsList: any[];
  myReportIds: Number[];
  currentReportFilters: any;

  constructor(private http: BaseHttpService) {}

  getCurrentReportFilterListener() {
    return this.currentReportFiltersSubject.asObservable();
  }

  myReportIdListener() {
    return this.myReportsIdsSub.asObservable();
  }

  reportExistListener() {
    return this.reportExistSub.asObservable();
  }

  setReport(id: any) {
    this.currentReportId = id;

    if (this.reportExistForCurrentTab()) {
      this.currentReportFiltersSubject.next(this.getCurrentReportFilter(id));
    } else {
      this.currentReportFiltersSubject.next({});
    }
  }

  getMyReportIds() {
    this.myReportIds = [];
    this.myReportsList.map(item => {
      this.myReportIds.push(item.reportId);
    });
    this.myReportsIdsSub.next(this.myReportIds);
  }

  saveReport(report) {
    this.deleteExistingSavedItem();
    this.myReportsList.push({
      reportFilter: report,
      reportId: this.currentReportId
    });
    this.myReportIds.push(this.currentReportId);
  }

  private deleteExistingSavedItem() {
    if (this.myReportsList !== undefined && this.myReportsList.length >= 0) {
      let index = -1;
      this.myReportsList.filter((item, i) => {
        if (item.reportId === this.currentReportId) {
          index = i;
        }
      });
      if (index > -1) {
        this.myReportsList.splice(index, 1);
      }
    }
  }

  reportExistForCurrentTab() {
    let index = -1;
    this.myReportIds.filter((item, i) => {
      if (item === this.currentReportId) {
        index = i;
      }
    });
    return index !== -1;
  }

  getCurrentReportFilter(id) {
    let item = this.myReportsList.filter(item => {
      if (item.reportId === id) {
        return item.reportFilter;
      }
    });
    console.log(item[0].reportFilter);
    return item[0].reportFilter;
  }

  getUserReports() {
    const params = { userId: "abc@abc.com" };
    this.http.get("api/report/get-reports", params).subscribe(reports => {
      this.myReportsList = reports;
      this.getMyReportIds();
    });
  }
}

interface Report {
  reportId: number;
  report: any;
}

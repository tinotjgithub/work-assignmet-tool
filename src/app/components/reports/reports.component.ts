import { Component, OnInit, AfterViewChecked } from "@angular/core";
import { ReportService } from "src/app/services/report/report.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"]
})
export class ReportsComponent implements OnInit, AfterViewChecked {
  id: any = "0";
  reports: Array<number> = [];
  val = 1000;
  myReportIds: any;
  myReportIdSubscr: Subscription;

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.getUserReports();
    this.myReportIdSubscr = this.reportService
      .myReportIdListener()
      .subscribe(ids => {
        this.reports = [...ids];
        this.setComponentId(this.reports[0]);
      });
  }

  ngAfterViewChecked() {
    var item = $("#" + this.id);
    $(".activelink").removeClass("active");
    item.addClass("active");
  }

  setComponentId(reportId) {
    this.id = reportId;
    this.reportService.setReport(reportId);
  }

  removeReport(id) {
    const index = this.reports.indexOf(id);
    if (index > -1) {
      this.reports.splice(index, 1);
    }
    if (this.id === id) {
      let len = this.reports.length;
      let previous = this.reports[(index + len - 1) % len];
      this.setComponentId(previous);
    }
  }

  addReportTab() {
    let id = this.reports[this.reports.length - 1] + 1;
    this.reports.push(id);
    this.setComponentId(id);
  }
}

import { Component, OnInit, AfterViewChecked } from "@angular/core";
@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"]
})
export class ReportsComponent implements OnInit, AfterViewChecked {
  id: any = "1";
  reports: Array<number> = [1, 2, 3];
  val = 1000;
  constructor() {}

  ngOnInit() {}

  ngAfterViewChecked() {
    var item = $("#" + this.id);
    $(".activelink").removeClass("active");
    item.addClass("active");
  }

  setComponentId(id) {
    this.id = id;
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

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { TaskmanagementService } from "src/app/services/task-management/taskmanagement.service";

@Component({
  selector: 'app-audit-score',
  templateUrl: './audit-score.component.html',
  styleUrls: ['./audit-score.component.css']
})
export class AuditScoreComponent implements OnInit {
  dataaudit: any;
  isAuditRendered: boolean = false;
  userAuditScoreDto: any;
  constructor(public datePipe: DatePipe, private router: Router, private taskManagementService: TaskmanagementService) { }

  ngOnInit() {
    this.getDefaultAuditDates();
  }

  //audit chart
  titleaudit = "";
  typeaudit = "ColumnChart";
  columnNamesaudit = ["", "Completed", "Audit Success"];
  optionsaudit = {
    hAxis: {
      title: ""
    },
    vAxis: {
    },
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true
    }
  };
  widthaudit = 350;
  heightaudit = 200;

  getDefaultAuditDates() {
    this.taskManagementService.getAuditScores("", "", "");
    this.userAuditScoreDto = this.taskManagementService.auditScoreResponse;
    this.taskManagementService.getAuditScoresListner().subscribe(data => {
      this.userAuditScoreDto = data;
      if (this.userAuditScoreDto && this.userAuditScoreDto.userAuditScoreDto) {
        this.getAuditChartValue(this.userAuditScoreDto.userAuditScoreDto);
      }
      this.isAuditRendered = true;
    })
  }

  getAuditChartValue(responseValue: any) {
    let responseLength = responseValue.length;
    this.dataaudit = [];
    for (var index = 0; index < responseLength; index++) {
      const day = this.datePipe.transform(responseValue[index].startDate, 'dd-MM-yyyy');
      this.dataaudit.push([day, responseValue[index].completedAuditCount, responseValue[index].successAuditCount]);
    }
  }

}
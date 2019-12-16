import { Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TaskmanagementService } from "src/app/services/task-management/taskmanagement.service";
import * as moment from 'moment';

@Component({
  selector: 'app-status-date',
  templateUrl: './status-date.component.html',
  styleUrls: ['./status-date.component.css']
})
export class StatusDateComponent implements OnInit {
  datastatus: any;
  isStatusRendered: boolean = false;
  userStatusDto: any;
  status: boolean = false;
  constructor(public datePipe: DatePipe, private router: Router, private taskManagementService: TaskmanagementService) { }

  ngOnInit() {
    this.getDefaultStatusDates();
  }

   //Status chart
   titlestatus = "";
   typestatus = "PieChart";
   columnNamesstatus = ["Status", "Count"];
   optionsstatus = {
     pieSliceText: 'value'
   };
   widthstatus = 700;
   heightstatus = 350;

   getDefaultStatusDates() {
    this.taskManagementService.getStatusScores("", "", "");
    this.userStatusDto = this.taskManagementService.statusScoreResponse;
    this.taskManagementService.getStatusScoresListner().subscribe(data => {
      this.userStatusDto = data;
      this.datastatus = [];
      if (this.userStatusDto && this.userStatusDto.userStatusDtos) {
        this.userStatusDto.userStatusDtos.map(val => {
          this.datastatus.push([val.status, val.claimCount]);
        })
      }
      this.isStatusRendered = true;
    })
  }
}

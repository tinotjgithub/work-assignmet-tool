import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TaskmanagementService } from "src/app/services/task-management/taskmanagement.service";
import * as moment from 'moment';

@Component({
  selector: 'app-draw-score',
  templateUrl: './draw-score.component.html',
  styleUrls: ['./draw-score.component.css']
})
export class DrawScoreComponent implements OnInit {

  productiveSchedule: FormGroup;
  dataproductivity: any;
  yearOptions: any = [];
  scheduleOptions: any;
  defaultDate: any;
  submittedProd: boolean = false;
  isProdRendered: boolean = false;
  monthWise: boolean = false;
  dayWise: boolean = false;
  weekWise: boolean = false;
  yearWise: boolean = false;
  scheduleList = Array<{ scheduleId: number, scheduleName: string }>();
  userProductivityDto: any;

  constructor(public datePipe: DatePipe, private router: Router, fbprod: FormBuilder, fbcon: FormBuilder, private taskManagementService: TaskmanagementService) {
    this.productiveSchedule = fbprod.group({
      scheduleProductive: [''],
      scheduleMonth: [''],
      scheduleDay: [''],
      scheduleYear: [''],
      scheduleFromWeek: [''],
      scheduleToWeek: ['']
    })

  }
  get prod() { return this.productiveSchedule.controls; }

  //Productivity chart

  productivityType = "LineChart";
  titleproductivity = "";
  typeproductivity = "LineChart";
  columnNamesproductivity = ["", "Count", "Target"];
  optionsproductivity = {
    hAxis: {
      title: "",
      type: 'string'
    },
    vAxis: {
      title: "",
      minValue: 0
    },
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true,
    },
    pointSize: 15
  };
  widthproductivity = 900;
  heightproductivity = 400;

  ngOnInit() {
    window.scrollTo(0, 0);
    let that = this;
    this.getScheduleList();
    this.getYearList();
    this.getDefaultProductiveSchedule();
  }

  getDefaultProductiveSchedule() {
    this.taskManagementService.getMyProdScores("");
    this.userProductivityDto = this.taskManagementService.myprodScoreResponse;
    this.taskManagementService.getMyProdScoresListner().subscribe(data => {
      this.userProductivityDto = data;
      if (this.userProductivityDto && this.userProductivityDto.userProductivityDtoHourly) {
        this.getProductivityChartValue(this.userProductivityDto.userProductivityDtoHourly, 'daily');
      }
      this.isProdRendered = true;
    })
  }

  getProductivityChartValue(responseValue: any, schedule: string) {
    let productivity = responseValue;
    let responseLength = productivity.length;
    this.dataproductivity = [];
    let scheduleFormat;
    for (var index = 0; index < responseLength; index++) {
      if (schedule === 'weekly')
        scheduleFormat = this.datePipe.transform(productivity[index].finishDate, 'EEEE');
      else if (schedule === 'monthly')
        scheduleFormat = productivity[index].finishDate;
      else if (schedule === 'yearly')
        scheduleFormat = this.datePipe.transform(productivity[index].finishDate, 'MMM');
      else if (schedule === 'daily')
        scheduleFormat = this.datePipe.transform(productivity[index].finishDate, 'hh');

      this.dataproductivity.push([scheduleFormat, productivity[index].claimCount, responseValue[index].target]);
    }
  }

  getProductiveDays() {
    //incoming response from service 
    const scheduleValue = this.productiveSchedule.get('scheduleProductive').value;
    let scheduleArray = [];
    scheduleArray = (this.scheduleList.filter((val => val.scheduleId === scheduleValue.value)));
    const schedule = scheduleArray && scheduleArray[0] && scheduleArray[0].scheduleName ? scheduleArray[0].scheduleName : '';
    this.taskManagementService.getMyProdScores(schedule);
    this.userProductivityDto = this.taskManagementService.prodScoreResponse;
    this.taskManagementService.getMyProdScoresListner().subscribe(data => {
      this.userProductivityDto = data;
      if (schedule === "daily") {
        if (this.userProductivityDto && this.userProductivityDto.userProductivityDtoHourly) {
          this.getProductivityChartValue(this.userProductivityDto.userProductivityDtoHourly, schedule);
        }
      }
      else if (schedule === "monthly") {
        if (this.userProductivityDto && this.userProductivityDto.userProductivityDtoDaily) {
          this.getProductivityChartValue(this.userProductivityDto.userProductivityDtoDaily, schedule);
        }
      }
      else if (schedule === "yearly") {
        if (this.userProductivityDto && this.userProductivityDto.userProductivityDtoMonthly) {
          this.getProductivityChartValue(this.userProductivityDto.userProductivityDtoMonthly, schedule);
        }
      } else if (schedule === "weekly") {
        if (this.userProductivityDto && this.userProductivityDto.userProductivityDtoWeekly) {
          this.getProductivityChartValue(this.userProductivityDto.userProductivityDtoWeekly, schedule);
        }
      }
    })
  }

  getScheduleList() {
    this.scheduleOptions = [];
    this.scheduleList = [
      { scheduleId: 1, scheduleName: 'daily' },
      { scheduleId: 2, scheduleName: 'weekly' },
      { scheduleId: 3, scheduleName: 'monthly' },
      { scheduleId: 4, scheduleName: 'yearly' }
    ];
    this.scheduleOptions.push({ "name": '--Select Schedule--', "value": null })
    this.scheduleList.map((s) => {
      this.scheduleOptions.push({ "name": s.scheduleName, "value": s.scheduleId });
    })
  }

  getYearList() {
    this.yearOptions = [];
    this.yearOptions.push({ "name": '--Select Year--', "value": null })
    for (var y = 2000; y <= 2030; y++) {
      this.yearOptions.push({ "name": y, "value": y });
    }
    console.log(this.yearOptions);
  }

  onChangeSchedule() {
    let val = this.productiveSchedule.get('scheduleProductive').value;
    this.dayWise = val.value === 1 ? true : false;
    this.weekWise = val.value === 2 ? true : false;
    this.monthWise = val.value === 3 ? true : false;
    this.yearWise = val.value === 4 ? true : false;
  }

  onSubmitProductive() {
    this.submittedProd = true;
    this.getProductiveDays();
  }

}


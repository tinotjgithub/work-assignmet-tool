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
  productiveDates: FormGroup;
  productiveDateValue: any;
  dataproductivity: any;
  submittedProd: boolean = false;
  isProdRendered: boolean = false;
 

  actionList = Array<{ actionId: number, actionName: string }>();
  userProductivityDto: any;
  constructor(public datePipe: DatePipe, private router: Router, fbprod: FormBuilder, fbcon: FormBuilder, private taskManagementService: TaskmanagementService) {
    const today = new Date();
    const current = new Date();
    const sevenDaysBack = current.setDate(current.getDate() - 5);
    const currentDate = {
      year: parseInt(this.datePipe.transform(today, ('yyyy'))),
      month: parseInt(this.datePipe.transform(today, ('MM'))),
      day: parseInt(this.datePipe.transform(today, ('dd')))
    }
    const lastWeek = {
      year: parseInt(this.datePipe.transform(sevenDaysBack, ('yyyy'))),
      month: parseInt(this.datePipe.transform(sevenDaysBack, ('MM'))),
      day: parseInt(this.datePipe.transform(sevenDaysBack, ('dd')))
    }
    this.productiveDates = fbprod.group({
      fromDateProductive: [lastWeek, Validators.required],
      toDateProductive: [currentDate, Validators.required],
      actionProductive: ['']
    })
  }
  get prod() { return this.productiveDates.controls; }
  myData = [
    ["Active", 100],
    ["Non Active", 260]
  ];
  type = "PieChart";

  myData1 = [
    ["Logged In", 100],
    ["Not Logged In", 15]
  ];

  //Productivity chart

  productivityType = "LineChart";
  titleproductivity = "";
  typeproductivity = "LineChart";
  columnNamesproductivity = ["", "Count"];
  optionsproductivity = {
    hAxis: {
      title: ""
    },
    vAxis: {
      title: "",
      minValue: 0
    },
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true
    },
    pointSize: 15
  };
  widthproductivity = 550;
  heightproductivity = 350;


  ngOnInit() {
    window.scrollTo(0, 0);
    let that = this;
    this.getActionList();
    this.getDefaultProductiveDates();
  }

  getDefaultProductiveDates() {
    this.taskManagementService.getProdScores("", "", "");
    this.userProductivityDto = this.taskManagementService.prodScoreResponse;
    this.taskManagementService.getProdScoresListner().subscribe(data => {
      this.userProductivityDto = data;
      if (this.userProductivityDto && this.userProductivityDto.userProductivityDto) {
        this.getProductivityChartValue(this.userProductivityDto.userProductivityDto);
      }
      this.isProdRendered = true;
    })
  }


  getProductivityChartValue(responseValue: any) {
    let responseLength = responseValue.length;
    this.dataproductivity = [];
    var day = [];
    const firstDate = moment(responseValue[0].finishDate);
    const secondDate = moment(responseValue[responseLength - 1].finishDate);
    for (var index = 0; index < responseLength; index++) {
      const firstDay: Date = responseValue[0].finishDate;
      let dates = new Date(firstDay);
      const day = this.datePipe.transform(responseValue[index].finishDate, 'EEEE');
      this.dataproductivity.push([day, responseValue[index].claimCount]);
    }
  }

  getProductiveDays() {
    //incoming response from service 
    const actionValue = this.productiveDates.get('actionProductive').value;
    const fromDateValue = this.productiveDates.get('fromDateProductive').value;
    const toDateValue = this.productiveDates.get('toDateProductive').value;
    const formattedFromDate = this.datePipe.transform((fromDateValue.year + '-' + fromDateValue.month + '-' + fromDateValue.day), 'yyyy-MM-dd');
    const formattedToDate = this.datePipe.transform((toDateValue.year + '-' + toDateValue.month + '-' + toDateValue.day), 'yyyy-MM-dd');
    let actionArray = [];
    actionArray = (this.actionList.filter((val => val.actionId.toString() === actionValue)));
    const action = actionArray && actionArray[0] && actionArray[0].actionName ? actionArray[0].actionName : '';
    this.taskManagementService.getProdScores(action, formattedFromDate, formattedToDate);
    this.userProductivityDto = this.taskManagementService.prodScoreResponse;
    this.taskManagementService.getProdScoresListner().subscribe(data => {
      this.userProductivityDto = data;
      if (this.userProductivityDto && this.userProductivityDto.userProductivityDto) {
        this.getProductivityChartValue(this.userProductivityDto.userProductivityDto);
      }
    })
  }

  getActionList() {
    this.actionList = [
      { actionId: 1, actionName: 'complete' },
      { actionId: 2, actionName: 'pend' },
      { actionId: 3, actionName: 'route' }
    ];
  }

  validateDates(fromDate: any, toDate: any): any {
    const formattedFromDate = this.datePipe.transform((fromDate.year + '-' + fromDate.month + '-' + fromDate.day), 'yyyy-MM-dd');
    const formattedToDate = this.datePipe.transform((toDate.year + '-' + toDate.month + '-' + toDate.day), 'yyyy-MM-dd');
    const firstDate = moment(formattedFromDate);
    const secondDate = moment(formattedToDate);
    const diffInDays = Math.abs(firstDate.diff(secondDate, 'days'))
    return { "firstDate": firstDate, "secondDate": secondDate, "difference": diffInDays };
  }

  validateProdDates(DateObj: any) {
    let valid = true;
    if (DateObj.firstDate > DateObj.secondDate) {
      this.productiveDates.get('fromDateProductive').setErrors({ 'incorrectLimit': true });
      valid = false;
    }
    else if (DateObj.difference > 5) {
      this.productiveDates.get('fromDateProductive').setErrors({ 'incorrectDiff': true });
      valid = false;
    }
    else {
      this.productiveDates.get('fromDateProductive').setErrors({ 'incorrectDiff': false });
      this.productiveDates.get('fromDateProductive').setErrors({ 'incorrectLimit': false });
      valid = true;
    }
    return valid;
  }

  onSubmitProductive() {
    this.submittedProd = true;
    const fromDate = this.productiveDates.get('fromDateProductive').value;
    const toDate = this.productiveDates.get('toDateProductive').value;
    const dateObj = this.validateDates(fromDate, toDate);
    const isValid = this.validateProdDates(dateObj);
    if (!isValid) {
      return;
    } else {
      this.getProductiveDays();
    }
  }

}


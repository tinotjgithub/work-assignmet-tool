import { Component, OnInit } from "@angular/core";
import * as CanvasJS from './../../../../../assets/canvasjs.min';
import { Router } from "@angular/router";
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TaskmanagementService } from "src/app/services/task-management/taskmanagement.service";
import * as moment from 'moment';

@Component({
  selector: "app-score-card",
  templateUrl: "./score-card.component.html",
  styleUrls: ["./score-card.component.css"]
})
export class ScoreCardComponent implements OnInit {

  productiveDates: FormGroup;
  contributionDates: FormGroup;
  productiveDateValue: any;
  contributionDateValue: any;
  dataproductivity: any;
  datastatus: any;
  datacontribution: any;
  submittedProd: boolean = false;
  isProdRendered: boolean = false;
  isConRendered: boolean = false;
  isStatusRendered: boolean = false;
  submittedCon: boolean = false;

  actionList = Array<{ actionId: number, actionName: string }>();
  userProductivityDto: any;
  userContributionDto: any;
  userStatusDto: any;
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
    this.contributionDates = fbcon.group({
      fromDateContribution: [lastWeek, Validators.required],
      toDateContribution: [currentDate, Validators.required],
      actionContribution: ['']
    })
  }
  get prod() { return this.productiveDates.controls; }
  get con() { return this.contributionDates.controls; }
  status: boolean = false;
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

  // Contribution Chart

  titlecontribution = "";
  typecontribution = "ColumnChart";
  columnNamescontribution = ["", "Total", "Me"];
  optionscontribution = {
    hAxis: {
      title: ""
    },
    vAxis: {
      minValue: 0,
      format: '#%'
    },
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true
    },
    isStacked: 'percent'
  };
  widthcontribution = 700;
  heightcontribution = 350;

  //audit chart

  titleaudit = "";
  typeaudit = "ColumnChart";
  dataaudit = [
    ["W1", 180, 180],
    ["W2", 173, 173],
    ["W3", 168, 168],
    ["W4", 189, 188],
    ["W5", 177, 174],
    ["W6", 186, 185]
  ];
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
  widthaudit = 700;
  heightaudit = 350;

  //Status chart
  titlestatus = "";
  typestatus = "PieChart";
  columnNamesstatus = ["Status", "Count"];
  optionsstatus = {
    pieSliceText: 'value'
  };
  widthstatus = 700;
  heightstatus = 350;

  //available vs productive chart

  titleavailable = "";
  typeavailable = "ColumnChart";
  dataavailable = [
    ["D1", 9.15, 7, 7],
    ["D2", 0, 0, 7],
    ["D3", 8.75, 7.7, 7],
    ["D4", 8.5, 6.45, 7],
    ["D5", 8.9, 8, 7],
    ["D6", 8.8, 7.15, 7]
  ];

  columnNamesavailable = ["", "Total Available", "Productive", "Target"];
  optionsavailable = {
    axes: {
      yvalue: {
        count: {
          minValue: 0
        }
      },
      xvalue: {
        day: {
          title: "",
          minValue: 0
        }, // Left y-axis.
        target: {
          side: 'right',
          label: 'Target',
          minValue: 0
        } // Right y-axis.
      },
      animation: {
        duration: 1000,
        easing: 'out',
        startup: true
      }
    },
    // series:{1:{targetAxisIndex:3}}, hAxes:{1:{title:'target', textStyle:{color: 'red'}}} 
    series: { 2: { type: 'line' } }
  };
  widthavailable = 700;
  heightavailable = 350;

  ngOnInit() {
    window.scrollTo(0, 0);
    let that = this;
    this.getActionList();
    this.getDefaultProductiveDates();
    this.getDefaultStatusDates();
    this.getDefaultContributionDates();
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

  getDefaultContributionDates() {
    this.taskManagementService.getConScores("", "", "");
    this.userContributionDto = this.taskManagementService.conScoreResponse;
    this.taskManagementService.getConScoresListner().subscribe(data => {
      this.userContributionDto = data;
      if (this.userContributionDto && this.userContributionDto.userContributionDtos) {
        this.getContributionChartValue(this.userContributionDto.userContributionDtos);
      }
      this.isConRendered = true;
    })
  }

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
  getContributionChartValue(responseValue: any) {
    let responseLength = responseValue.length;
    this.datacontribution = [];
    var day = [];
    const firstDate = moment(responseValue[0].finishDate);
    const secondDate = moment(responseValue[responseLength - 1].finishDate);
    for (var index = 0; index < responseLength; index++) {
      const firstDay: Date = responseValue[0].finishDate;
      let dates = new Date(firstDay);
      const day = this.datePipe.transform(responseValue[index].finishDate, 'EEEE');
      this.datacontribution.push([day, responseValue[index].teamClaimCount, responseValue[index].userClaimCount]);
    }
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

  getContributionDays() {
    const actionValue = this.contributionDates.get('actionContribution').value;
    const fromDateValue = this.contributionDates.get('fromDateContribution').value;
    const toDateValue = this.contributionDates.get('toDateContribution').value;
    const formattedFromDate = this.datePipe.transform((fromDateValue.year + '-' + fromDateValue.month + '-' + fromDateValue.day), 'yyyy-MM-dd');
    const formattedToDate = this.datePipe.transform((toDateValue.year + '-' + toDateValue.month + '-' + toDateValue.day), 'yyyy-MM-dd');
    let actionArray = [];
    actionArray = (this.actionList.filter((val => val.actionId.toString() === actionValue)));
    const action = actionArray && actionArray[0] && actionArray[0].actionName ? actionArray[0].actionName : '';
    this.taskManagementService.getConScores(action, formattedFromDate, formattedToDate);
    this.userContributionDto = this.taskManagementService.conScoreResponse;
    this.taskManagementService.getConScoresListner().subscribe(data => {
      this.userContributionDto = data;
      if (this.userContributionDto && this.userContributionDto.userContributionDtos) {
        this.getContributionChartValue(this.userContributionDto.userContributionDtos);
      }
    })
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

  validateConDates(dateObj: any) {
    let valid = true;
    if (dateObj.firstDate > dateObj.secondDate) {
      this.contributionDates.get('fromDateContribution').setErrors({ 'incorrectLimit': true });
      valid = false;
    }
    else if (dateObj.difference > 5) {
      this.contributionDates.get('fromDateContribution').setErrors({ 'incorrectDiff': true });
      valid = false;
    } else {
      this.contributionDates.get('fromDateContribution').setErrors({ 'incorrectDiff': false });
      this.contributionDates.get('fromDateContribution').setErrors({ 'incorrectLimit': false });
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

  onSubmitContribution() {
    this.submittedCon = true;
    const fromDate = this.contributionDates.get('fromDateContribution').value;
    const toDate = this.contributionDates.get('toDateContribution').value;
    const dateObj = this.validateDates(fromDate, toDate);
    const isValid = this.validateConDates(dateObj);
    if (!isValid) {
      return;
    } else {
      this.getContributionDays();
    }
  }
}


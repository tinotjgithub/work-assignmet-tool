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
  isStatusRendered: boolean = false;
  submittedCont: boolean = false;

  actionList = Array<{ actionId: number, actionName: string }>();
  userProductivityDto: any;
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
      actionProductive: ['', Validators.required]
    })
    this.contributionDates = fbcon.group({
      fromDateContribution: [lastWeek, Validators.required],
      toDateContribution: [currentDate, Validators.required],
      actionContribution: ['', Validators.required]
    })
  }
  get prod() { return this.productiveDates.controls; }
  get cont() { return this.contributionDates.controls; }
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
    isStacked: true
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
      console.log("this.dataproductivity : ", this.dataproductivity);
      this.isProdRendered = true;
      //  this.dataproductivity = [["Monday", 1], ["Tuesday", 2], ["Wednesday", 3]];       
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

  getDefaultContributionDates() {
    this.contributionDateValue = this.contributionDates.value;
    const formattedDate = this.contributionDateValue.fromDateContribution.year + '-' + this.contributionDateValue.fromDateContribution.month + '-' + this.contributionDateValue.fromDateContribution.day;
    var day = [];
    for (var conDate = 7; conDate > 0; conDate--) {
      var dates = new Date(formattedDate);
      const contributionDays = dates.setDate(dates.getDate() - conDate);
      day.push(this.datePipe.transform(contributionDays, 'EEEE'));
    }
    this.datacontribution = [
      [day[0], 0.5, 0.5],
      [day[1], 0.3, 0.7],
      [day[2], 0.3, 0.7],
      [day[3], 0.55, 0.45],
      [day[4], 0.5, 0.5],
      [day[5], 0.6, 0.4]
    ];
  }

  getContributionDays() {
    this.contributionDateValue = this.contributionDates.value;
    const formattedDate = this.contributionDateValue.fromDateContribution.year + '-' + this.contributionDateValue.fromDateContribution.month + '-' + this.contributionDateValue.fromDateContribution.day;
    var day = [];
    for (var conDate = 2; conDate > 0; conDate--) {
      var dates = new Date(formattedDate);
      const contributionDays = dates.setDate(dates.getDate() - conDate);
      day.push(this.datePipe.transform(contributionDays, 'EEEE'));
    }
    this.datacontribution = [
      [day[0], 0.5, 0.5],
      [day[1], 0.3, 0.7],
    ];
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
    const action = actionArray[0].actionName;
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
  validateProductiveDates(): boolean {
    let valid = true;
    const fromDate = this.productiveDates.get('fromDateProductive').value;
    const toDate = this.productiveDates.get('toDateProductive').value;
    const formattedFromDate = this.datePipe.transform((fromDate.year + '-' + fromDate.month + '-' + fromDate.day), 'yyyy-MM-dd');
    const formattedToDate = this.datePipe.transform((toDate.year + '-' + toDate.month + '-' + toDate.day), 'yyyy-MM-dd');

    const firstDate = moment(formattedFromDate);
    const secondDate = moment(formattedToDate);
    const diffInDays = Math.abs(firstDate.diff(secondDate, 'days'))
    if (firstDate > secondDate || diffInDays >= 6) {
      this.productiveDates.get('fromDateProductive').setErrors({ 'incorrect': true });
    }
    if (this.productiveDates.invalid) {
      valid = false;
    }
    return valid;
  }

  onSubmitProductive() {
    this.submittedProd = true;
    // this.getProductiveDays();
    const isValid = this.validateProductiveDates();
    if (!isValid) {
      return;
    } else {
      this.getProductiveDays();
    }
  }

  onSubmitContribution() {
    this.submittedCont = true;
    if (this.contributionDates.invalid) {
      return;
    } else {
      this.getContributionDays();
    }
  }
}


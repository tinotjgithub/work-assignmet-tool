import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TaskmanagementService } from "src/app/services/task-management/taskmanagement.service";
import * as moment from 'moment';

@Component({
  selector: 'app-my-contribution',
  templateUrl: './my-contribution.component.html',
  styleUrls: ['./my-contribution.component.css']
})
export class MyContributionComponent implements OnInit {
  contributionDates: FormGroup;
  contributionDateValue: any;
  datacontribution: any;
  userContributionDto: any;
  submittedCon: boolean = false;
  isConRendered: boolean = false;
  actionList = Array<{ actionId: number, actionName: string }>();

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

    this.contributionDates = fbcon.group({
      fromDateContribution: [lastWeek, Validators.required],
      toDateContribution: [currentDate, Validators.required],
      actionContribution: ['']
    })
  }

  get con() { return this.contributionDates.controls; }

  ngOnInit() {
    this.getActionList();
    this.getDefaultContributionDates();
  }

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
  widthcontribution = 350;
  heightcontribution = 200;


  getActionList() {
    this.actionList = [
      { actionId: 1, actionName: 'complete' },
      { actionId: 2, actionName: 'pend' },
      { actionId: 3, actionName: 'route' }
    ];
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

  validateDates(fromDate: any, toDate: any): any {
    const formattedFromDate = this.datePipe.transform((fromDate.year + '-' + fromDate.month + '-' + fromDate.day), 'yyyy-MM-dd');
    const formattedToDate = this.datePipe.transform((toDate.year + '-' + toDate.month + '-' + toDate.day), 'yyyy-MM-dd');
    const firstDate = moment(formattedFromDate);
    const secondDate = moment(formattedToDate);
    const diffInDays = Math.abs(firstDate.diff(secondDate, 'days'))
    return { "firstDate": firstDate, "secondDate": secondDate, "difference": diffInDays };
  }
}

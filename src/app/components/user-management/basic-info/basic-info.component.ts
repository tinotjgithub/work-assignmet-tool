import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { UserMgtService } from './../services/user-management.service';
import { BasicInfoModel } from './basic-info.model';
@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})

export class BasicInfoComponent implements OnInit {
  @Output() nextBasicTab: EventEmitter<string> = new EventEmitter<string>();
  basicInfo: FormGroup;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  submitted = false;
  skillList = Array<{ skillId: number, skillName: string }>();
  basicInformations: BasicInfoModel;
  constructor(fb: FormBuilder,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private userMgtService: UserMgtService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.basicInfo = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // userID: ['', Validators.required],
      primaryEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      effectiveFrom: ['', Validators.required],
      terminationDate: [''],
      resourceSkillset: ['', Validators.required]
    })
  }

  get info() { return this.basicInfo.controls; }

  onSubmit() {
    this.submitted = true;
    this.basicInformations = this.basicInfo.value;
    this.userMgtService.saveBasicInfo(this.basicInformations);
    this.nextBasicTab.emit('ASSIGN_ROLE');
  }

  reBuildForm() {
    let savedInfo = this.userMgtService.getBasicInfo();
    if (savedInfo) {
      this.basicInfo.get('firstName').setValue(savedInfo["firstName"]);
      this.basicInfo.get('lastName').setValue(savedInfo["lastName"]);
      // this.basicInfo.get('userID').setValue(savedInfo["userID"]);
      this.basicInfo.get('primaryEmail').setValue(savedInfo["primaryEmail"]);
      this.basicInfo.get('effectiveFrom').setValue(savedInfo["effectiveFrom"]);
      this.basicInfo.get('terminationDate').setValue(savedInfo["terminationDate"]);
      this.basicInfo.get('resourceSkillset').setValue(savedInfo["resourceSkillset"]);
    }
  }

  onFromDateSelection(date: NgbDate) {
    // const parsed = this.formatter.parse(date);
    const formattedDate = date.day + '-' + date.month + '-' + date.year;
    // this.formatter.parse(date);
    // if (!this.fromDate && !this.toDate) {
    //   this.fromDate = date;
    // } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
    //   this.toDate = date;
    // } else {
    //   this.toDate = null;
    //   this.fromDate = date;
    // }
    return this.basicInfo.get('effectiveFrom').setValue(formattedDate);
  }

  // validateFromDateInput(currentValue: NgbDate, input: string): NgbDate {
  //   const parsed = this.formatter.parse(input);
  //   return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  // }


  // isInside(date: NgbDate) {
  //   return date.after(this.fromDate) && date.before(this.toDate);
  // }

  // isRange(date: NgbDate) {
  //   return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date);
  // }

  // validateDateRange() {
  //   let isValidDate = false;
  //   isValidDate = this.isInside && this.isRange ? true : false;
  //   return isValidDate;
  // }

  // validateToDateInput(currentValue: NgbDate, input: string): NgbDate {
  //   const validDate = this.validateDateRange();
  //   const parsed = this.formatter.parse(input);
  //   return validDate && parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  // }

  resetAll() {
    this.basicInfo.reset({});
    this.submitted = false;
  }

  getSkillSet() {
    this.skillList = [
      { skillId: 1, skillName: 'Beginner' },
      { skillId: 2, skillName: 'Intermediate' },
      { skillId: 3, skillName: 'Expert' },
      { skillId: 4, skillName: 'Proficient' },
      { skillId: 5, skillName: 'SME' },
    ];
  }

  ngOnInit() {
    this.reBuildForm();
    this.getSkillSet();
  }

  disableSubmit() {
    const disable = !this.basicInfo.valid ? true : false;
    return disable;
  }
}

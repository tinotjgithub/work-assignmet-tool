import { Component, OnInit } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})

export class BasicInfoComponent implements OnInit {

  basicInfo: FormGroup;
  basicInformation: {};
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  submitted = false;

  constructor(fb: FormBuilder, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.basicInfo = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userId: ['', Validators.required],
      primaryEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      effectiveFrom: ['', Validators.required],
      terminationDate: ['', Validators.required],
      userSkillSet: ['', Validators.required]
    })
  }

  get info() { return this.basicInfo.controls; }

  onSubmit() {
    this.basicInformation = {};
    if (this.basicInfo.invalid) {
      return;
    }
    else {
      this.submitted = true;
      const firstName = this.basicInfo.get('firstName').value;
      const lastName = this.basicInfo.get('lastName').value;
      const userId = this.basicInfo.get('userId').value;
      const primaryEmail = this.basicInfo.get('primaryEmail').value;
      const effectiveFrom = this.basicInfo.get('effectiveFrom').value;
      const terminationDate = this.basicInfo.get('terminationDate').value;
      const userSkillSet = this.basicInfo.get('userSkillSet').value;
      this.basicInformation = {
        "firstName": firstName,
        "lastName": lastName,
        "userId": userId,
        "primaryEmail": primaryEmail,
        "effectiveFrom": effectiveFrom,
        "terminationDate": terminationDate,
        "userSkillSet": userSkillSet
      }
      console.log("basicInformation: ", this.basicInformation);
    }
  }

  onFromDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  validateFromDateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  // onToDateSelection(date: NgbDate) {
  //   if (!this.fromDate && !this.toDate) {
  //     this.fromDate = date;
  //   } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
  //     this.toDate = date;
  //   } else {
  //     this.toDate = null;
  //     this.fromDate = date;
  //   }
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

  ngOnInit() {
  }

  disableSubmit() {
    const disable = !this.basicInfo.valid ? true : false;
    return disable;
  }
}

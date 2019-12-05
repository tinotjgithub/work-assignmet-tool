import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { BaseHttpService } from "../base-http.service";
import AuditClaim from "./models/AuditClaim";
import AssignAuditTask from "./models/AuditAssingTask";
@Injectable({
  providedIn: "root"
})
export class TaskmanagementService {
  private tasks: any[] = [];
  private taskUpdatedSub = new Subject<any[]>();
  private prodScoresFetch = new Subject<any[]>();
  private statusScoresFetch = new Subject<any[]>();
  private claimDetailsSub = new Subject<any>();
  private conScoresFetch = new Subject<any>();
  private userId = "abc@abc.com";
  private auditClaimDetailsSub = new Subject<AuditClaim>();

  private loggedInUserEmail = "admin@promt.com";
  private taskTimerSub = new Subject<{
    timer: string;
    timerColor: string;
    timerFadeColor: string;
  }>();

  interval;
  timeLeft: number = 0;
  pause: boolean = false;
  timer: string = "00:00:00";
  minutes: number = 0;
  hours: number = 0;

  timerRedColor: string = "#bf0000";
  timerRedFadeColor: string = "#00b0b621";
  timerAmberColor: string = "#FFBF00";
  timerAmberFadeColor: string = "#00b0b621";
  timerColor: string = "#00bf96";
  timerFadeColor: string = "#00816a";
  timerStarted: boolean = false;

  claimDetails: any;
  prodScoreResponse: any;
  assignTaskResponse: any;
  statusScoreResponse: any;
  conScoreResponse: any;
  seconds: number;
  auditClaimDetails: AuditClaim;
  assignAuditTaskResponse: AssignAuditTask;

  constructor(public baseHTTPService: BaseHttpService) {
    this.startTimer();
  }

  getTaskListener() {
    return this.taskUpdatedSub.asObservable();
  }

  getProdScoresListner() {
    return this.prodScoresFetch.asObservable();
  }

  getStatusScoresListner() {
    return this.statusScoresFetch.asObservable();
  }


  getConScoresListner() {
    return this.conScoresFetch.asObservable();
  }

  getTaskTimerListener() {
    return this.taskTimerSub.asObservable();
  }

  getClaimDetailsListener() {
    return this.claimDetailsSub.asObservable();
  }

  getAuditClaimDetailsListener() {
    return this.auditClaimDetailsSub.asObservable();
  }

  resetTaskTimer() {
    this.timeLeft = 0;
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timerStarted = true;
      this.timeLeft++;
      this.timer = new Date(this.timeLeft * 1000).toISOString().substr(11, 8);
      this.minutes = Number(this.timer.substr(3, 2));
      this.hours = Number(this.timer.substr(0, 2));
      this.seconds = Number(this.timer.substr(6, 2));
      this.setTimerColor();
      this.taskTimerSub.next({
        timer: this.timer,
        timerColor: this.timerColor,
        timerFadeColor: this.timerFadeColor
      });
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  private setTimerColor() {
    if (this.hours >= 1 || this.minutes >= 1) {
      this.timerColor = this.timerRedColor;
      this.timerFadeColor = this.timerRedFadeColor;
    } else if (this.seconds >= 20 && this.seconds < 30) {
      this.timerColor = this.timerAmberColor;
      this.timerFadeColor = this.timerAmberFadeColor;
    } else if (this.seconds >= 30) {
      this.timerColor = this.timerRedColor;
      this.timerFadeColor = this.timerRedFadeColor;
    } else {
      this.timerColor = "#00bf96";
      this.timerFadeColor = "#00816a";
    }
  }

  getDiffDays(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getClaim() {
    this.baseHTTPService
      .get("api/draw-mode/draw-claim?primaryEmail=abc@abc.com")
      .subscribe(claim => {
        let clonedObject = claim;
        Object.assign(clonedObject, {
          age: this.getDiffDays(
            new Date(claim.entryDate),
            new Date(claim.receiptDate)
          )
        });
        this.claimDetails = claim;
        this.claimDetailsSub.next(this.claimDetails);
        this.assignTask();
      });
  }

  getProdScores(action, fromDate, toDate) {
    const param = {
      action: action,
      fromDate: fromDate,
      toDate: toDate,
      userId: 4
    };
    this.baseHTTPService
      .post(param, "api/data-dashboard/claims-per-user")
      .subscribe(data => {
        this.prodScoreResponse = data;
        this.prodScoresFetch.next(this.prodScoreResponse);
      },
        error => {
          // alert("Something Went Wrong");
        });
  }


  getConScores(action, fromDate, toDate) {
    const param = {
      action: action,
      fromDate: fromDate,
      toDate: toDate,
      userId: 4
    };
    this.baseHTTPService
      .post(param, "api/data-dashboard/claims-per-contribution")
      .subscribe(data => {
        this.conScoreResponse = data;
        this.conScoresFetch.next(this.conScoreResponse);
      },
        error => {
          // alert("Something Went Wrong");
        });
  }

  getStatusScores(action, fromDate, toDate) {
    const param = {
      action: action,
      fromDate: fromDate,
      toDate: toDate,
      userId: 4
    };
    this.baseHTTPService
      .post(param, "api/data-dashboard/claims-per-status")
      .subscribe(data => {
        this.statusScoreResponse = data;
        this.statusScoresFetch.next(this.statusScoreResponse);
      },
        error => {
          // alert("Something Went Wrong");
        }
      );
    // this.statusScoreResponse = {
    //   "userProductivityDto": null,
    //   "userStatusDtos": [
    //     {
    //       "status": "complete",
    //       "claimCount": 8
    //     },
    //     {
    //       "status": "pend",
    //       "claimCount": 5
    //     },
    //     {
    //       "status": "route",
    //       "claimCount": 1
    //     }
    //   ]
    // }
  }

  assignTask() {
    const param = {
      workItemType: this.claimDetails.claimType,
      workItemId: this.claimDetails.claimId,
      primaryEmail: this.loggedInUserEmail,
      startTime: new Date()
    };
    this.baseHTTPService
      .post(param, "api/draw-mode/assign-task")
      .subscribe(data => {
        this.assignTaskResponse = data;
      });
  }

  saveAndNavigateToNextClaim(action, timeStamp, comments) {
    const param = {
      taskId: this.assignTaskResponse.taskId,
      workItemId: this.assignTaskResponse.workItemId,
      workItemType: this.assignTaskResponse.workItemType,
      primaryEmail: this.loggedInUserEmail,
      startTime: this.assignTaskResponse.startTime,
      action,
      finishTime: timeStamp,
      comments
    };
    this.baseHTTPService.post(param, "api/draw-mode/update-task").subscribe(
      data => {
        this.resetTaskTimer();
        this.getClaim();
      },
      error => {
        alert("Something Went Wrong");
      }
    );
  }

  getAuditClaim() {
    this.baseHTTPService
      .get("api/audit-mode/audit-claim?primaryEmail=admin@promt.com")
      .subscribe(claim => {
        this.auditClaimDetails = claim;
        this.auditClaimDetailsSub.next(this.auditClaimDetails);
        this.assignAuditTask();
      });
  }

  assignAuditTask() {
    const param = {
      taskAssignmentId: this.auditClaimDetails.taskAssignmentId,
      auditorPrimaryEmail: this.loggedInUserEmail
    };

    this.baseHTTPService
      .post(param, "api/audit-mode/assign-task")
      .subscribe(data => {
        this.assignAuditTaskResponse = data;
      });
  }

  saveAndNavigateToNextAuditClaim(action, timeStamp, comments) {
    this.assignAuditTaskResponse["auditorComments"] = comments;
    this.assignAuditTaskResponse["auditorAction"] = action;
    this.assignAuditTaskResponse[
      "auditorPrimaryEmail"
    ] = this.loggedInUserEmail;
    this.baseHTTPService
      .post(this.assignAuditTaskResponse, "api/draw-mode/update-task")
      .subscribe(
        data => {
          this.getAuditClaim();
        },
        error => {
          alert("Something Went Wrong");
        }
      );
  }
}

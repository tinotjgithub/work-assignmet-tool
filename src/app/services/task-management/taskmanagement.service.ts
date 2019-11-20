import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { BaseHttpService } from "../base-http.service";

const BACKEND_URL = "http://localhost:3000/";
@Injectable({
  providedIn: "root"
})
export class TaskmanagementService {
  private tasks: any[] = [];
  private taskUpdatedSub = new Subject<any[]>();
  private claimDetailsSub = new Subject<any>();

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
  assignTaskResponse: any;

  constructor(public baseHTTPService: BaseHttpService) {
    this.startTimer();
  }

  getTaskListener() {
    return this.taskUpdatedSub.asObservable();
  }

  getTaskTimerListener() {
    return this.taskTimerSub.asObservable();
  }

  getClaimDetailsListener() {
    return this.claimDetailsSub.asObservable();
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
    if (this.hours >= 1) {
      this.timerColor = this.timerRedColor;
      this.timerFadeColor = this.timerRedFadeColor;
    } else if (this.minutes >= 1 && this.minutes < 2) {
      this.timerColor = this.timerAmberColor;
      this.timerFadeColor = this.timerAmberFadeColor;
    } else if (this.minutes >= 2) {
      this.timerColor = this.timerRedColor;
      this.timerFadeColor = this.timerRedFadeColor;
    }
  }

  getPosts() {
    this.baseHTTPService.get("api/posts/").subscribe(postData => {
      this.tasks = postData.posts;
      this.taskUpdatedSub.next([...this.tasks]);
    });
  }

  getDiffDays(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  getClaim() {
    this.baseHTTPService
      .get("api/drawMode/drawClaims?userId=admin")
      .subscribe(claim => {
        let clonedObject = claim;
        Object.assign(clonedObject, {
          age: this.getDiffDays(
            new Date(claim.entryDate),
            new Date(claim.receiptDate)
          )
        });

        this.claimDetails = claim;
        console.log(this.claimDetails);
        this.claimDetailsSub.next(this.claimDetails);
        this.assignTask();
      });
  }

  assignTask() {
    const param = {
      workItemType: this.claimDetails.claimType,
      workItemId: this.claimDetails.claimId,
      userId: "1",
      startTime: new Date()
    };
    this.baseHTTPService
      .post(param, "api/drawMode/assignTask")
      .subscribe(data => {
        this.assignTaskResponse = data;
        console.log(this.assignTaskResponse);
      });
  }
}

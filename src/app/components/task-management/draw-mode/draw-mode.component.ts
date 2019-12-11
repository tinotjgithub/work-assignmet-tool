import { Component, OnInit, OnDestroy } from "@angular/core";
import { TaskmanagementService } from "src/app/services/task-management/taskmanagement.service";
import { Subscription } from "rxjs";
import { DatePipe } from "@angular/common";
import { AppComponent } from "./../../../app.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-draw-mode",
  templateUrl: "./draw-mode.component.html",
  styleUrls: ["./draw-mode.component.css"]
})
export class DrawModeComponent implements OnInit, OnDestroy {
  private taskTimerSubscription: Subscription;
  action: any;

  constructor(
    private taskManagementService: TaskmanagementService,
    private datePype: DatePipe,
    public app: AppComponent,
    private route: ActivatedRoute
  ) {}
  // These are important variables
  pause: boolean;
  timer = "00:00:00";
  timerColor = "#00bf96";
  timerFadeColor = "#00816a";
  claimDetails: any;
  showCompleteClaimModal = false;
  comments: "";
  private claimDetailsSubscription: Subscription;

  breakReasons: Array<BreakReasons> = [
    {
      value: 1,
      label: "Coffee break"
    },
    {
      value: 2,
      label: "Lunch/dinner break"
    },
    {
      value: 3,
      label: "team Meeting"
    },
    {
      value: 3,
      label: "Personal Time"
    },
    {
      value: 4,
      label: "Done for the day"
    }
  ];

  ngOnInit() {
    this.pause = this.taskManagementService.pauseValue;
    this.timer = this.taskManagementService.timerValue;
    this.timerColor = this.taskManagementService.timerColorValue;
    this.timerFadeColor = this.taskManagementService.timerFadeColorValue;

    // Data:  { title: 'Company' }
    this.route.data.subscribe(data => console.log(data));
    // Fetching first claim
    this.taskManagementService.getClaim();

    // tslint:disable-next-line: no-angle-bracket-type-assertion
    (<any>$("[data-toggle=tooltip")).tooltip();
    this.taskTimerSubscription = this.taskManagementService
      .getTaskTimerListener()
      .subscribe(
        (timerDetails: {
          timer: string;
          timerColor: string;
          timerFadeColor: string;
        }) => {
          this.timer = timerDetails.timer;
          this.timerColor = timerDetails.timerColor;
          this.timerFadeColor = timerDetails.timerFadeColor;
        }
      );

    this.claimDetails = this.taskManagementService.claimDetails;
    this.claimDetailsSubscription = this.taskManagementService
      .getClaimDetailsListener()
      .subscribe((claimDetails: any) => {
        this.claimDetails = claimDetails;
      });
  }

  setPause() {
    this.pause = !this.pause;
    if (this.pause) {
      this.taskManagementService.pauseTimer();
    } else {
      this.taskManagementService.startTimer();
      this.taskTimerSubscription.add();
    }
  }

  setAction(value) {
    this.action = value;
  }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
  }

  triggerClaimCompletion(action = "complete", comments = this.comments) {
    this.taskManagementService
      .saveAndNavigateToNextClaim(action, new Date(), comments)
      .then(() => {
        this.comments = "";
        this.app.showSuccess(
          "Claim(s) moved to " + action + " status successfully!!",
          "SUCCESS"
        );
      })
      .catch(() => {
        this.app.showFailure(
          "Claim(s) falied moving to " + action + " status!!",
          "WARNING"
        );
      });
  }

  ngOnDestroy(): void {
    this.taskTimerSubscription.unsubscribe();
  }
}

class BreakReasons {
  value: number;
  label: string;
}

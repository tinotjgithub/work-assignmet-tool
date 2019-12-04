import { Component, OnInit, OnDestroy } from "@angular/core";
import { TaskmanagementService } from "src/app/services/task-management/taskmanagement.service";
import { Subscription } from "rxjs";
import { DatePipe } from "@angular/common";
import { AppComponent } from './../../../app.component';

@Component({
  selector: "app-audit-mode",
  templateUrl: "./audit-mode.component.html",
  styleUrls: ["./audit-mode.component.css"]
})
export class AuditModeComponent implements OnInit, OnDestroy {
  action: any;

  constructor(
    private taskManagementService: TaskmanagementService,
    private datePype: DatePipe,
    public app: AppComponent
  ) {}

  claimDetails: any;
  showCompleteClaimModal = false;
  comments: "";
  private claimDetailsSubscription: Subscription;

  ngOnInit() {
    (<any>$("[data-toggle=tooltip")).tooltip();

    this.claimDetails = this.taskManagementService.claimDetails;
    this.claimDetailsSubscription = this.taskManagementService
      .getClaimDetailsListener()
      .subscribe((claimDetails: any) => {
        this.claimDetails = claimDetails;
      });
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
    this.taskManagementService.saveAndNavigateToNextClaim(
      action,
      new Date(),
      comments
    );
    this.comments = "";
    this.app.showSuccess("Claim(s) moved to "+ action +" status successfully!!", "SUCCESS");
  }

  ngOnDestroy(): void {

  }
}

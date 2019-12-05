import { Component, OnInit, OnDestroy } from "@angular/core";
import { TaskmanagementService } from "src/app/services/task-management/taskmanagement.service";
import { Subscription } from "rxjs";
import { DatePipe } from "@angular/common";
import { AppComponent } from "./../../../app.component";
import AuditClaim from "src/app/services/task-management/models/AuditClaim";

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

  claimDetails: AuditClaim;
  showCompleteClaimModal = false;
  comments: "";
  private claimDetailsSubscription: Subscription;

  ngOnInit() {
    (<any>$("[data-toggle=tooltip")).tooltip();
    this.claimDetails = this.taskManagementService.auditClaimDetails;
    this.claimDetailsSubscription = this.taskManagementService
      .getAuditClaimDetailsListener()
      .subscribe((claimDetails: AuditClaim) => {
        this.claimDetails = claimDetails;
      });
    this.taskManagementService.getAuditClaim();
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

  triggerClaimCompletion(action = "ACCEPT", comments = this.comments) {
    this.taskManagementService.saveAndNavigateToNextAuditClaim(
      action,
      new Date(),
      comments
    );
    this.comments = "";
    this.app.showSuccess(
      "Claim(s) moved to " + action + " status successfully!!",
      "SUCCESS"
    );
  }

  ngOnDestroy(): void {}
}

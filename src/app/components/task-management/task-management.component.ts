import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { TaskmanagementService } from "src/app/services/task-management/taskmanagement.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-task-management",
  templateUrl: "./task-management.component.html",
  styleUrls: ["./task-management.component.css"]
})
export class TaskManagementComponent implements OnInit {
  constructor(
    private taskManagementService: TaskmanagementService,
    private authService: AuthService
  ) {}
  id: string = "DRAW";
  status: boolean = false;
  tasks: any[] = [];
  private taskSub: Subscription;

  content: string = "";
  title: string = "";

  clickEvent() {
    this.status = !this.status;
  }

  ngOnInit() {
    this.setClassorNav();
    this.authService.setAuthToken();
    this.taskManagementService.getPosts();

    this.taskSub = this.taskManagementService
      .getTaskListener()
      .subscribe((tasks: any[]) => {
        this.tasks = tasks;
        console.log("Tasks", tasks[0].message);
        this.content = tasks[0].content;
        this.title = tasks[0].title;
      });
  }

  private setClassorNav() {
    $(document).ready(function() {
      $(".activelink").click(function(e) {
        $(".activelink").removeClass("active");
        var $this = $(this);
        if (!$this.hasClass("active")) {
          $this.addClass("active");
        }
        e.preventDefault();
      });
    });
  }

  setComponentId(id) {
    this.id = id;
  }
}

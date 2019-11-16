import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { TaskmanagementService } from 'src/app/services/task-management/taskmanagement.service';

@Component({
  selector: "app-task-management",
  templateUrl: "./task-management.component.html",
  styleUrls: ["./task-management.component.css"]
})
export class TaskManagementComponent implements OnInit {
  constructor(private taskManagementService: TaskmanagementService) { }
  id: string = "DRAW"
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }

  ngOnInit() {
    this.setClassorNav();
    this.taskManagementService.getPosts();
  }

  private setClassorNav() {
    $(document).ready(function () {
      $(".activelink").click(function (e) {
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

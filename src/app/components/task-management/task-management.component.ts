import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "app-task-management",
  templateUrl: "./task-management.component.html",
  styleUrls: ["./task-management.component.css"]
})
export class TaskManagementComponent implements OnInit {
  constructor() {}

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }

  ngOnInit() {
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
}

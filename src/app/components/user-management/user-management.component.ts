import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"]
})

export class UserManagementComponent implements OnInit {
  constructor() { }
  id = "INFO";
  ngOnInit() {
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

  setComponentId(id: string) {
    let tabId = "";
    this.id = id;
    $(".activelink").removeClass("active");
    tabId = id === "ASSIGN_ROLE" ? "#assign-role" : id === "WB" ? "#assign-wb" : id === "INFO" ? "#basic-info" : "";
    tabId !== "" ? $(tabId).addClass('active') : "";
  }
}

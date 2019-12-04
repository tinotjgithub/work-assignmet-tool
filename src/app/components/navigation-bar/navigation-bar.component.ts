import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Router } from "@angular/router";
import { HeaderService } from "src/app/services/header/header.service";

@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.css"]
})
export class NavigationBarComponent implements OnInit {
  visibleSidebar1: boolean = false;
  items: MenuItem[];

  constructor(private router: Router, private headerService: HeaderService) {}

  ngOnInit() {
    this.visibleSidebar1 = this.headerService.openSideMenu;
    this.headerService.sideMenuClickedListener().subscribe(value => {
      this.visibleSidebar1 = value;
    });

    this.items = [
      {
        label: "Actions",
        icon: "fa fa-tasks",
        items: [
          {
            label: "My Score Card",
            icon: "fa fa-calculator",
            command: e => {
              this.router.navigateByUrl("MyScorecard");
              this.visibleSidebar1 = false;
            }
          },
          {
            label: "Draw Mode",
            icon: "fa fa-file",
            command: e => {
              this.router.navigateByUrl("DrawMode");
              this.visibleSidebar1 = false;
            }
          },
          {
            label: "Audit Mode",
            icon: "fa fa-check-square",
            command: e => {
              this.router.navigateByUrl("AuditMode");
              this.visibleSidebar1 = false;
            }
          }
        ]
      },
      {
        label: "Dashboard",
        icon: "fa fa-pie-chart",
        items: [
          {
            label: "My Dashboard",
            icon: "fa fa-bar-chart",
            command: e => {
              this.router.navigateByUrl("Dashboard");
              this.visibleSidebar1 = false;
            }
          }
        ]
      },
      {
        label: "User Management",
        icon: "fa fa-user-circle",
        items: [
          {
            label: "Mange Users",
            icon: "fa fa-user-plus",
            command: e => {
              this.router.navigateByUrl("UserManagement");
              this.visibleSidebar1 = false;
            }
          }
        ]
      },
      {
        label: "Reports",
        icon: "fa fa-print",
        items: [
          {
            label: "My Reports",
            icon: "fa fa-newspaper-o",
            command: e => {
              this.router.navigateByUrl("Reports");
              this.visibleSidebar1 = false;
            }
          }
        ]
      },
      {
        label: "Prioritization",
        icon: "fa fa-exclamation-triangle",
        items: [
          {
            label: "Reprioritize",
            icon: "fa fa-exclamation-triangle",
            command: e => {
              this.router.navigateByUrl("Reprioritize");
              this.visibleSidebar1 = false;
            }
          }
        ]
      }
    ];
  }
}

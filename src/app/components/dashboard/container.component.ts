import { Component, OnInit } from "@angular/core";
import * as CanvasJS from "../../../assets//canvasjs.min";
import { Router } from "@angular/router";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"]
})
export class ContainerComponent implements OnInit {
  constructor(private router: Router) { }

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

  id = "OVERALL";
  status: boolean = false;
  myData = [
    ["Active", 100],
    ["Non Active", 260]
  ];
  type = "PieChart";

  myData1 = [
    ["Logged In", 100],
    ["Not Logged In", 15]
  ];

  lineType = "LineChart";

  titleline = "";
  typeline = "LineChart";
  dataline = [
    ["23 Nov", 10, 8],
    ["24 Nov", 6, 4],
    ["25 Nov", 7, 5],
    ["28 Nov", 9, 6]
  ];
  columnNamesline = ["Day", "Logged In", "Total"];
  optionsline = {
    hAxis: {
      title: "Day"
    },
    vAxis: {
      title: "Count"
    }
  };
  widthline = 550;
  heightline = 400;

  // Intake Chart

  lineTypeIntake = "LineChart";

  titlelineIntake = "";
  typelineIntake = "LineChart";
  datalineIntake = [
    ["Week 20", 10, 8, 0],
    ["Week 21", 6, 2, 0],
    ["Week 22", 4, 3, 0],
    ["Week 23", 5, 1, 0],
    ["Week 24", 8, 8, 0]
  ];
  columnNameslineIntake = ["Week", "Intake", "Completed", "Record Count"];
  optionslineIntake = {
    hAxis: {
      title: "Day"
    },
    vAxis: {
      title: "Count"
    }
  };
  widthlineIntake = 550;
  heightlineIntake = 400;

  // Progress Chart

  lineTypeProgress = "LineChart";

  titlelineProgress = "";
  typelineProgress = "LineChart";
  datalineProgress = [
    ["1 hr", 20, 25],
    ["2 hr", 20, 18],
    ["3  hr", 20, 23],
    ["4 hr", 20, 27],
    ["5 hr", 20, 16],
    ["6 hr", 20, 19],
    ["7 hr", 20, 30],
    ["8 hr", 20, 28],
    ["9 hr", 20, 20]
  ];
  columnNameslineProgress = ["Week", "Target", "Count"];
  optionslineProgress = {
    hAxis: {
      title: "Target"
    },
    vAxis: {
      title: "Count"
    }
  };
  widthlineProgress = 550;
  heightlineProgress = 400;

  clickEvent() {
    this.status = !this.status;
  }

  setComponentId(id) {
    let tabId = "";
    this.id = id;
    $(".activelink").removeClass("active");
    tabId = id === "OVERALL" ? "#business-dashboard" : "#team-wb";
    tabId !== "" ? $(tabId).addClass('active') : "";
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.setClassorNav();
    let that = this;
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      data: [
        {
          type: "column",
          click: function (e) {
            let myParamObject = {
              xvalue: e.dataPoint.x,
              yvalue: e.dataPoint.y
            };
            that.router.navigateByUrl("Reprioritize", {
              queryParams: myParamObject
            });
          },
          dataPoints: [
            { y: 200, label: "0$ - 200$" },
            { y: 160, label: "$100 - $1000" },
            { y: 135, label: "$1000- $20,000" },
            { y: 27, label: "$20,000 - Above" }
          ]
        }
      ]
    });

    let chart1 = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      exportEnabled: true,
      data: [
        {
          type: "column",
          click: function (e) {
            let myParamObject = {
              xvalue: e.dataPoint.x,
              yvalue: e.dataPoint.y
            };
            that.router.navigateByUrl("Reprioritize", {
              queryParams: myParamObject
            });
          },
          dataPoints: [
            // { y: 200, label: "0$ - 200$" },
            // { y: 350, label: "$100 - $1000" },
            // { y: 175, label: "$1000- $20,000" },
            // { y: 10, label: "$20,000 - Above" }
            { y: 200, label: "Priority 1" },
            { y: 350, label: "Priority 2" },
            { y: 175, label: "Priority 3" },
            { y: 10, label: "Priority 4 - Above" }
          ]
        }
      ]
    });

    let chart3 = new CanvasJS.Chart("chartContainer3", {
      animationEnabled: true,
      exportEnabled: true,
      data: [
        {
          type: "column",
          click: function (e) {
            let myParamObject = {
              xvalue: e.dataPoint.x,
              yvalue: e.dataPoint.y
            };
            that.router.navigateByUrl("Reprioritize", {
              queryParams: myParamObject
            });
          },
          dataPoints: [
            { y: 125, label: "0-10" },
            { y: 76, label: "0-20" },
            { y: 8, label: "20-30" },
            { y: 6, label: "30-60" },
            { y: 2, label: "60-90" },
            { y: 0, label: "90 Above" }
          ]
        }
      ]
    });

    let chart4 = new CanvasJS.Chart("chartContainer4", {
      animationEnabled: true,
      exportEnabled: true,
      data: [
        {
          type: "column",
          click: function (e) {
            let myParamObject = {
              xvalue: e.dataPoint.x,
              yvalue: e.dataPoint.y
            };
            that.router.navigateByUrl("Reprioritize", {
              queryParams: myParamObject
            });
          },
          dataPoints: [
            { y: 5, label: "Auth" },
            { y: 15, label: "Dup Logic" },
            { y: 7, label: "NPP WB" },
            { y: 15, label: "COP WB" }
          ]
        }
      ]
    });

    chart.render();
    chart1.render();
    chart3.render();
    chart4.render();
  }
}

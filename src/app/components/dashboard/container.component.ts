import { Component, OnInit } from "@angular/core";
import * as CanvasJS from "../../../assets//canvasjs.min";
import { Router } from "@angular/router";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"]
})
export class ContainerComponent implements OnInit {
  constructor(private router: Router) {}

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

  clickEvent() {
    this.status = !this.status;
  }

  ngOnInit() {
    let that = this;
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Aging Dollar Impact"
      },
      data: [
        {
          type: "column",
          click: function(e) {
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
            { y: 350, label: "$100 - $1000" },
            { y: 175, label: "$1000- $20,000" },
            { y: 10, label: "$20,000 - Above" }
          ]
        }
      ]
    });

    let chart1 = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "SLA Risk - Auth Count"
      },
      data: [
        {
          type: "column",
          click: function(e) {
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
            { y: 350, label: "$100 - $1000" },
            { y: 175, label: "$1000- $20,000" },
            { y: 10, label: "$20,000 - Above" }
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
          click: function(e) {
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
            { y: 350, label: "$100 - $1000" },
            { y: 175, label: "$1000- $20,000" },
            { y: 10, label: "$20,000 - Above" }
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
          click: function(e) {
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
            { y: 350, label: "$100 - $1000" },
            { y: 175, label: "$1000- $20,000" },
            { y: 10, label: "$20,000 - Above" }
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

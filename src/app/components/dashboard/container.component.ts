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
    ["Logged Out", 15]
  ];

  dataLine = [
    ["Year", "Sales", "Expenses"],
    ["2004", 1000, 400],
    ["2005", 1170, 460],
    ["2006", 660, 1120],
    ["2007", 1030, 540]
  ];

  lineType  = "LineChart"

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

    chart.render();
    chart1.render();
  }
}

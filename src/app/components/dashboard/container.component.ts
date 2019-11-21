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
            alert(
              e.dataSeries.type +
                ", dataPoint { x:" +
                e.dataPoint.x +
                ", y: " +
                e.dataPoint.y +
                " }"
            );
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
            alert(
              e.dataSeries.type +
                ", dataPoint { x:" +
                e.dataPoint.x +
                ", y: " +
                e.dataPoint.y +
                " }"
            );
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

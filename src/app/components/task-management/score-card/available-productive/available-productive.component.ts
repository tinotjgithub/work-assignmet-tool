import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TaskmanagementService } from "src/app/services/task-management/taskmanagement.service";

@Component({
  selector: 'app-available-productive',
  templateUrl: './available-productive.component.html',
  styleUrls: ['./available-productive.component.css']
})
export class AvailableProductiveComponent implements OnInit {
  dataavailable: any;
  isAvailableVsProdRendered: boolean = false;
  userAvailableVsProdDto: any;
  constructor(public datePipe: DatePipe, private taskManagementService: TaskmanagementService) { }

  ngOnInit() {
    this.getDefaultAvailableVsProd();
  }

  //available vs productive chart

  titleavailable = "";
  typeavailable = "ColumnChart";
  columnNamesavailable = ["", "Total Available", "Productive", "Target"];
  optionsavailable = {
    axes: {
      yvalue: {
        count: {
          minValue: 0
        }
      },
      xvalue: {
        day: {
          title: "",
          minValue: 0
        }, // Left y-axis.
        target: {
          side: 'right',
          label: 'Target',
          minValue: 0
        } // Right y-axis.
      },
      animation: {
        duration: 1000,
        easing: 'out',
        startup: true
      }
    },
    series: { 2: { type: 'line' } }
  };
  widthavailable = 700;
  heightavailable = 350;

  getDefaultAvailableVsProd() {
    this.taskManagementService.getAvailableVsProdScores("", "", "");
    this.userAvailableVsProdDto = this.taskManagementService.availableVsProdScoreResponse;
    this.taskManagementService.getAvailableVsProdScoresListner().subscribe(data => {
      this.userAvailableVsProdDto = data;
      if (this.userAvailableVsProdDto && this.userAvailableVsProdDto.availableVsProductiveDtos) {
        this.geAvailableVsProdChartValue(this.userAvailableVsProdDto.availableVsProductiveDtos);
      }
      this.isAvailableVsProdRendered = true;
    })
  }

  geAvailableVsProdChartValue(responseValue: any) {
    let responseLength = responseValue.length;
    this.dataavailable = [];
    for (var index = 0; index < responseLength; index++) {
      const day = this.datePipe.transform(responseValue[index].days, 'EEEE');
      this.dataavailable.push([day, responseValue[index].availableCount, responseValue[index].productiveCount, responseValue[index].targetHours]);
    }
    console.log("dataavailable: ", this.dataavailable);
  }


}

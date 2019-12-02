import { Component, OnInit } from "@angular/core";
import * as CanvasJS from './../../../../../assets/canvasjs.min';
import { Router } from "@angular/router";
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "app-score-card",
  templateUrl: "./score-card.component.html",
  styleUrls: ["./score-card.component.css"]
})
export class ScoreCardComponent implements OnInit {

  productiveDates: FormGroup;
  productiveDateValue: any;
  constructor(private router: Router, fb: FormBuilder) {
    this.productiveDates = fb.group({
      fromDateProductive: ['', Validators.required],
      toDateProductive: ['', Validators.required]
    })
  }
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

  //Productivity chart

  productivityType = "LineChart";
  titleproductivity = "";
  typeproductivity = "LineChart";
  dataproductivity = [
    ["D1", 24],
    ["D2", 19],
    ["D3", 15],
    ["D4", 26],
    ["D5", 25],
    ["D6", 20]
  ];
  columnNamesproductivity = ["", "Count"];
  optionsproductivity = {
    hAxis: {
      title: ""
    },
    vAxis: {
      title: "",
      minValue: 0
    },
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true
    },
    pointSize: 15
  };
  widthproductivity = 550;
  heightproductivity = 350;

  // Contribution Chart

  titlecontribution = "";
  typecontribution = "ColumnChart";
  datacontribution = [
    ["D1", 0.5, 0.5],
    ["D2", 0.3, 0.7],
    ["D3", 0.3, 0.7],
    ["D4", 0.55, 0.45],
    ["D5", 0.5, 0.5],
    ["D6", 0.6, 0.4]
  ];
  columnNamescontribution = ["", "Total", "Me"];
  optionscontribution = {
    hAxis: {
      title: ""
    },
    vAxis: {
      minValue: 0,
      format: '#%'
    },
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true
    },
    isStacked: true
  };
  widthcontribution = 700;
  heightcontribution = 350;

  //audit chart

  titleaudit = "";
  typeaudit = "ColumnChart";
  dataaudit = [
    ["W1", 180, 180],
    ["W2", 173, 173],
    ["W3", 168, 168],
    ["W4", 189, 188],
    ["W5", 177, 174],
    ["W6", 186, 185]
  ];
  columnNamesaudit = ["", "Completed", "Audit Success"];
  optionsaudit = {
    hAxis: {
      title: ""
    },
    vAxis: {
    },
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true
    }
  };
  widthaudit = 700;
  heightaudit = 350;

  //Status chart
  titlestatus = "";
  typestatus = "PieChart";
  datastatus = [
    ["Final", 122],
    ["Denied", 27],
    ["Pend", 22],
    ["Route", 9]
  ];
  columnNamesstatus = ["Status", "Count"];
  optionsstatus = {
    pieSliceText: 'value'
  };
  widthstatus = 700;
  heightstatus = 350;

  //available vs productive chart

  titleavailable = "";
  typeavailable = "ColumnChart";
  dataavailable = [
    ["D1", 9.15, 7, 7],
    ["D2", 0, 0, 7],
    ["D3", 8.75, 7.7, 7],
    ["D4", 8.5, 6.45, 7],
    ["D5", 8.9, 8, 7],
    ["D6", 8.8, 7.15, 7]
  ];

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
    // series:{1:{targetAxisIndex:3}}, hAxes:{1:{title:'target', textStyle:{color: 'red'}}} 
    series: { 2: { type: 'line' } }
  };
  widthavailable = 700;
  heightavailable = 350;

  ngOnInit() {
    window.scrollTo(0, 0);
    // this.setClassorNav();
    let that = this;
  }

  onSubmit() {
    if (this.productiveDates.invalid) {
      return;
    } else {
      debugger
      this.productiveDateValue = this.productiveDates.value;
    }
  }


}

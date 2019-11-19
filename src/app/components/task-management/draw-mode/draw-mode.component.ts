import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-draw-mode",
  templateUrl: "./draw-mode.component.html",
  styleUrls: ["./draw-mode.component.css"]
})
export class DrawModeComponent implements OnInit {
  constructor() {}
  interval;
  subscribeTimer: any;
  timeLeft: number = 0;
  pause: boolean = false;
  timer: string = "00:00:00";
  seconds: string = "00";
  minutes: number = 0;
  hours: number = 0;

  timerRedColor: string = "#bf0000";
  timerRedFadeColor: string = "#00b0b621";
  timerAmberColor: string = "#FFBF00";
  timerAmberFadeColor: string = "#00b0b621";

  timerColor: string = "#00bf96";
  timerFadeColor: string = "#00816a";

  breakReasons: Array<BreakReasons> = [
    {
      value: 1,
      label: "Coffee break"
    },
    {
      value: 2,
      label: "Lunch/dinner break"
    },
    {
      value: 3,
      label: "team Meeting"
    },
    {
      value: 3,
      label: "Personal Time"
    },
    {
      value: 4,
      label: "Done for the day"
    }
  ];

  ngOnInit() {
    (<any>$("[data-toggle=tooltip")).tooltip();
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timeLeft++;
      this.timer = new Date(this.timeLeft * 1000).toISOString().substr(11, 8);
      this.minutes = Number(this.timer.substr(3, 2));
      this.hours = Number(this.timer.substr(0, 2));
      if (this.hours >= 1) {
        this.timerColor = this.timerRedColor;
        this.timerFadeColor = this.timerRedFadeColor;
      } else if (this.minutes >= 1 && this.minutes < 2) {
        this.timerColor = this.timerAmberColor;
        this.timerFadeColor = this.timerAmberFadeColor;
      } else if (this.minutes >= 2) {
        this.timerColor = this.timerRedColor;
        this.timerFadeColor = this.timerRedFadeColor;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  setPause() {
    this.pause = !this.pause;
    if (this.pause) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);
  }
}

class BreakReasons {
  value: number;
  label: string;
}

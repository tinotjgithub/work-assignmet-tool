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
  minutes: string = "00";
  hours: string = "00";
  ngOnInit() {
    (<any>$("[data-toggle=tooltip")).tooltip();
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timeLeft++;
      this.timer = new Date(this.timeLeft * 1000).toISOString().substr(11, 8);
      console.log(this.timer);
      this.seconds = this.timer.substr(6, 8);
      this.minutes = this.timer.substr(3, 5);
      this.hours = this.timer.substr(0, 2);
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
}

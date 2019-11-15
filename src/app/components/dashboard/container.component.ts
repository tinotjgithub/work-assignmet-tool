import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"]
})
export class ContainerComponent implements OnInit {
  constructor() {}

  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }

  ngOnInit() {}
}

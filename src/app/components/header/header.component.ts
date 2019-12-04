import { Component, OnInit } from "@angular/core";
import { HeaderService } from "src/app/services/header/header.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private headerService: HeaderService) {}

  menuOpen() {
    this.headerService.setSideMenuAction(true);
  }

  ngOnInit() {}
}

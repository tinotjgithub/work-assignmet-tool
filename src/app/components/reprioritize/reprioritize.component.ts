import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppComponent } from './../../app.component';

@Component({
  selector: "app-reprioritize",
  templateUrl: "./reprioritize.component.html",
  styleUrls: ["./reprioritize.component.css"]
})
export class ReprioritizeComponent implements OnInit {
  constructor(private app: AppComponent, private router: Router) { }
  claimObject = [
    {
      claimId: 2019100900000000,
      claimType: "Institutional",
      billedAmount: "$23220.50",
      workBasket: "Auth",
      claimSource: "EDI",
      Age: "27"
    },
    {
      claimId: 2019100910000000,
      claimType: "Institutional",
      billedAmount: "$23160.50",
      workBasket: "COB",
      claimSource: "EDI",
      Age: "28"
    },
    {
      claimId: 2019125800000000,
      claimType: "Institutional",
      billedAmount: "$21580.50",
      workBasket: "Missing Member",
      claimSource: "EDI",
      Age: "27"
    },
    {
      claimId: 2011250900000000,
      claimType: "Institutional",
      billedAmount: "$235620.50",
      workBasket: "High Dollar",
      claimSource: "EDI",
      Age: "22"
    },
    {
      claimId: 2011250980000000,
      claimType: "Institutional",
      billedAmount: "$23250.50",
      workBasket: "Auth",
      claimSource: "EDI",
      Age: "21"
    }
  ];

  ngOnInit() { }


  reprioritize() {
    this.app.showSuccess("Claim(s) reprioritized successfully!!", "SUCCESS");
    setTimeout(function () {
      this.router.navigate(['/Dashboard']);
    }.bind(this), 2001);
  }
}

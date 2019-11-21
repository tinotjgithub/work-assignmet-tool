import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-reprioritize",
  templateUrl: "./reprioritize.component.html",
  styleUrls: ["./reprioritize.component.css"]
})
export class ReprioritizeComponent implements OnInit {
  constructor() {}
  claimObject = [
    {
      claimId: 2019100900000000,
      claimType: "Institutional",
      billedAmount: "$23220.50",
      workBasket: "Itemized Bill WB",
      claimSource: "EDI",
      Age: "10"
    },
    {
      claimId: 2019100910000000,
      claimType: "Institutional",
      billedAmount: "$23160.50",
      workBasket: "Itemized Bill WB",
      claimSource: "EDI",
      Age: "2"
    },
    {
      claimId: 2019125800000000,
      claimType: "Institutional",
      billedAmount: "$21580.50",
      workBasket: "Itemized Bill WB",
      claimSource: "EDI",
      Age: "1"
    },
    {
      claimId: 2011250900000000,
      claimType: "Institutional",
      billedAmount: "$235620.50",
      workBasket: "Itemized Bill WB",
      claimSource: "EDI",
      Age: "12"
    },
    {
      claimId: 2019158600000,
      claimType: "Institutional",
      billedAmount: "$23250.50",
      workBasket: "Itemized Bill WB",
      claimSource: "EDI",
      Age: "13"
    }
  ];

  ngOnInit() {}
}

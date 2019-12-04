import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SelectItem } from "primeng/api";
import { ReportService } from "src/app/services/report/report.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-report-page",
  templateUrl: "./report-page.component.html",
  styleUrls: ["./report-page.component.css"]
})
export class ReportPageComponent implements OnInit, OnChanges {
  private reportSub: Subscription;
  reportExist: boolean;
  currentReportFilter: any;

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.submitted = false;
    this.initializeForm();
  }
  registerForm: FormGroup;
  submitted = false;

  claimds: SelectItem[];
  selectedClaimids: SelectItem[];

  wbids: SelectItem[];
  selectedWbids: string[] = [];

  claimsources: SelectItem[];
  selectedClaimsources: SelectItem[];

  supplierNames: SelectItem[];
  selectedsupplierName: SelectItem[];

  cars: SelectItem[];

  selectedCars1: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) {
    this.cars = [
      { label: "Audi", value: "Audi" },
      { label: "BMW", value: "BMW" },
      { label: "Fiat", value: "Fiat" },
      { label: "Ford", value: "Ford" },
      { label: "Honda", value: "Honda" },
      { label: "Jaguar", value: "Jaguar" },
      { label: "Mercedes", value: "Mercedes" },
      { label: "Renault", value: "Renault" },
      { label: "VW", value: "VW" },
      { label: "Volvo", value: "Volvo" }
    ];

    this.claimds = [
      { label: "100001", value: "100001" },
      { label: "100002", value: "100002" },
      { label: "100003", value: "100003" },
      { label: "100004", value: "100004" },
      { label: "100005", value: "100005" },
      { label: "100006", value: "100006" },
      { label: "100007", value: "100007" }
    ];

    this.wbids = [
      { label: "WB1", value: "WB1" },
      { label: "WB2", value: "WB2" },
      { label: "WB3", value: "WB3" },
      { label: "WB4", value: "WB4" },
      { label: "WB5", value: "WB5" },
      { label: "WB6", value: "WB6" }
    ];

    this.claimsources = [
      { label: "Claim Src 1", value: "Claim Source 1" },
      { label: "Claim Src 2", value: "Claim Source 2" },
      { label: "Claim Src 3", value: "Claim Source 3" },
      { label: "Claim Src 4", value: "Claim Source 4" },
      { label: "Claim Src 5", value: "Claim Source 5" }
    ];

    this.supplierNames = [
      { label: "Supplier 1", value: "Supplier 1" },
      { label: "Supplier 2", value: "Supplier 2" },
      { label: "Supplier 3", value: "Supplier 3" },
      { label: "Supplier 4", value: "Supplier 4" },
      { label: "Supplier 5", value: "Supplier 5" }
    ];
  }

  @Input() id: number;

  ngOnInit() {
    this.reportService.getCurrentReportFilterListener().subscribe(filters => {
      this.currentReportFilter = filters;
      this.initializeForm();
    });
  }

  initializeForm() {
    const {
      billedAmountFrom,
      billedAmountTo,
      allowedAmountFrom,
      allowedAmountTo,
      selectedWbids,
      selectedClaimsources,
      selectedSupplierName,
      selectedClaimids,
      age,
      last
    } = this.currentReportFilter;

    this.registerForm = this.formBuilder.group({
      selectedClaimids: [
        selectedClaimids === undefined ? [] : selectedClaimids,
        Validators.required
      ],
      billedAmountFrom: [
        billedAmountFrom === undefined ? 0 : billedAmountFrom,
        Validators.required
      ],
      billedAmountTo: [
        billedAmountTo === undefined ? 0 : billedAmountTo,
        Validators.required
      ],
      allowedAmountFrom: [
        allowedAmountFrom === undefined ? 0 : allowedAmountFrom,
        Validators.required
      ],
      allowedAmountTo: [
        allowedAmountTo === undefined ? 0 : allowedAmountTo,
        Validators.required
      ],
      selectedWbids: [
        selectedWbids === undefined ? [] : selectedWbids,
        Validators.required
      ],
      selectedClaimsources: [
        selectedClaimsources === undefined ? [] : selectedClaimsources,
        Validators.required
      ],
      age: [age === undefined ? 0 : age, Validators.required],
      selectedSupplierName: [
        selectedSupplierName === undefined ? [] : selectedSupplierName,
        Validators.required
      ],
      last: [last === undefined ? 0 : last, Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.reportExist = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // Do Save here
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value));
    this.reportService.saveReport(this.registerForm.value);

    // After call back
    // this.submitted = false;
  }

  onChange() {}
}
class City {
  name: string;
  code: string;
}

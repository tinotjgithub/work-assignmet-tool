import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  get firstname() {
    return this.form.get("firstName");
  }

  ngOnInit() {}

  onSubmit() {
      this.authService.setLogin();
      this.router.navigateByUrl("LandingPage");
  }
}

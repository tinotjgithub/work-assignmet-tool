import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/modules/authentication/services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
      )
    ])
  });
  constructor(private AuthService: AuthenticationService) {}

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }

  ngOnInit() {
    this.AuthService.logout();
  }

  onSubmit() {
    this.AuthService.login(this.email, this.password);
  }
}

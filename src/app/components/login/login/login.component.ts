import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';

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
      Validators.minLength(6)
    ])
  });
  constructor(private AuthService: AuthenticationService) {}

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }

  ngOnInit() {}

  onSubmit() {
    this.AuthService.login(this.email, this.password);
  }
}

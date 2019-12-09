import { Injectable } from "@angular/core";
import { BaseHttpService } from "src/app/services/base-http.service";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private http: BaseHttpService) {}

  login(username, password) {
    const param = {
      username,
      password
    };
    this.http.get("api/authentication/login", param).subscribe(res => {
      console.log(res);
    });
  }
}

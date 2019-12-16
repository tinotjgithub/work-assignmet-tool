import { Injectable } from "@angular/core";
import { BaseHttpService } from "src/app/services/base-http.service";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { ROLES } from "../../../shared/constants.js";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  authToken: string;
  roleId: string;
  isAuthenticated = false;
  authUpdated = new Subject<any>();

  constructor(private http: BaseHttpService, private router: Router) {}

  login(username, password) {
    const param = {
      username,
      password
    };

    this.setLogin({ success: true, token: "TEST TOKEN", roleId: "ADMIN" });

    // This shoud be changed to post when all others are pulled the latest and DB has valid data
    // this.http.get("token/authenticate", param).subscribe(res => {
    //   this.setLogin({ success: true, token: res.jwttoken, roleId: "ADMIN" });
    // });

  }

  setLogin(loginRes) {
    this.isAuthenticated = loginRes.success;
    this.authToken = loginRes.token;
    this.roleId = loginRes.roleId;
    localStorage.setItem("authToken", this.authToken);

    this.authUpdated.next({
      isAuthenticated: this.isAuthenticated,
      authToken: this.authToken,
      roleId: this.roleId
    });

    switch (this.roleId) {
      case ROLES.processor:
        this.router.navigateByUrl("MyScorecard");
        break;
      case ROLES.auditor:
        this.router.navigateByUrl("AuditMode");
        break;
      case ROLES.admin:
        this.router.navigateByUrl("Dashboard");
        break;
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.authToken = null;
    this.roleId = null;
    this.authUpdated.next({
      isAuthenticated: false,
      authToken: null,
      roleId: null
    });
  }

  checkIsAuthenticated() {
    return this.isAuthenticated;
  }

  authUpdatedListener() {
    return this.authUpdated.asObservable();
  }

  get userRole() {
    return this.roleId;
  }
}

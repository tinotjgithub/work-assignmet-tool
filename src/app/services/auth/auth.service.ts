import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  // private isAuthenticated = false;
  // private authToken: string;
  // constructor(private http: HttpClient, private router: Router) {}
  // private authUpdated = new Subject<boolean>();

  // getIsAuth() {
  //   return this.isAuthenticated;
  // }

  // getAuthToken() {
  //   return this.authToken;
  // }

  // authUpdatedListener() {
  //   return this.authUpdated.asObservable();
  // }

  // setAuthToken() {
  //   this.authToken = "SampleTokenTino1234";
  // }

  // setLogin() {
  //   this.isAuthenticated = true;
  //   this.authUpdated.next(this.isAuthenticated);
  // }

  // logout() {
  //   this.isAuthenticated = false;
  //   this.authUpdated.next(this.isAuthenticated);
  // }
}

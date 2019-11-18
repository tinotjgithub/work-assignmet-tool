import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = true;
  private authToken: string;
  constructor(private http: HttpClient,
    private router: Router) { }

  getIsAuth() {
    alert('sdsa')
    return this.isAuthenticated;
  }

  getAuthToken() {
    return this.authToken;
  }

  setAuthToken() {
    this.authToken = "SampleTokenTino1234"
  }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "work-assignment-tool";
  isAuthenticated: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authService.authUpdatedListener().subscribe((isAuthed: boolean) => {
      this.isAuthenticated = isAuthed;
    });
    if (!this.isAuthenticated) {
      this.router.navigate(['']);
    }
  }
}

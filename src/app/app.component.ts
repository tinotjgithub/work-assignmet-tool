import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth/auth.service";
import { Router } from "@angular/router";
import { UserMgtService } from "./components/user-management/services/user-management.service";
import { ToastService } from "./services/toast.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [UserMgtService, ToastService]
})
export class AppComponent implements OnInit {
  title = "work-assignment-tool";
  isAuthenticated: boolean;
  clicked = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authService.authUpdatedListener().subscribe((isAuthed: boolean) => {
      this.isAuthenticated = isAuthed;
    });
    if (!this.isAuthenticated) {
      this.router.navigate([""]);
    }
  }
  showStandard(message: string, header: string) {
    this.toastService.show(message, {
      delay: 2000,
      autohide: true
    });
  }

  showSuccess(message: string, header: string) {
    this.toastService.show(message, {
      classname: "bg-success text-light",
      delay: 2000,
      autohide: true,
      header: false,
      headertext: header
    });
  }

  showError(message: string, header: string) {
    this.toastService.show(message, {
      classname: "bg-danger text-light",
      delay: 2000,
      autohide: true,
      header: false,
      headertext: header
    });
  }

  menuClickedEvent(clicked) {
    this.clicked = clicked;
    alert(this.clicked);
  }
}

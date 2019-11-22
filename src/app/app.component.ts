import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth/auth.service";
import { Router } from "@angular/router";
import { UserMgtService } from './components/user-management/services/user-management.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [UserMgtService, ToastService]
})
export class AppComponent implements OnInit {
  title = "work-assignment-tool";
  isAuthenticated: boolean;
  constructor(private authService: AuthService, private router: Router, public toastService: ToastService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authService.authUpdatedListener().subscribe((isAuthed: boolean) => {
      this.isAuthenticated = isAuthed;
    });
    if (!this.isAuthenticated) {
      this.router.navigate(['']);
    }
  }
  // showStandard() {
  //   this.toastService.show('I am a standard toast', {
  //     delay: 2000,
  //     autohide: true
  //   });
  // }
 
  // showSuccess() {
  //   this.toastService.show('I am a success toast', {
  //     classname: 'bg-success text-light',
  //     delay: 2000 ,
  //     autohide: true,
  //     headertext: 'Toast Header'
  //   });
  // }
  // showError() {
  //   this.toastService.show('I am a success toast', {
  //     classname: 'bg-danger text-light',
  //     delay: 2000 ,
  //     autohide: true,
  //     headertext: 'Error!!!'
  //   });
  // }
 
  // showCustomToast(customTpl) {
  //   this.toastService.show(customTpl, {
  //     classname: 'bg-info text-light',
  //     delay: 3000,
  //     autohide: true
  //   });
  // }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth/auth.service";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { UserMgtService } from "./components/user-management/services/user-management.service";
import { ToastService } from "./services/toast.service";
import { MenuItem } from "primeng/api";
import { filter } from "rxjs/operators";
import { isNullOrUndefined } from "util";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [UserMgtService, ToastService]
})
export class AppComponent implements OnInit {
  private items: MenuItem[] = [{ label: "Home" }];
  title = "work-assignment-tool";
  isAuthenticated: boolean;
  clicked = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    public toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.items = this.createBreadcrumbs(this.activatedRoute.root);
      });

    this.isAuthenticated = this.authService.getIsAuth();
    this.authService.authUpdatedListener().subscribe((isAuthed: boolean) => {
      this.isAuthenticated = isAuthed;
    });
    if (!this.isAuthenticated) {
      this.router.navigate([""]);
    }
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = "#",
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map(segment => segment.path)
        .join("/");
      if (routeURL !== "") {
        url += `/${routeURL}`;
      }

      const label: MenuItem[] = child.snapshot.data["breadcrumb"];
      if (!isNullOrUndefined(label)) {
        label.map(item => {
          breadcrumbs.push({ label: item.label });
        });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
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
      classname: "bg-success text-dark",
      delay: 2000,
      autohide: true,
      header: false,
      headertext: header
    });
  }

  showFailure(message: string, header: string) {
    this.toastService.show(message, {
      classname: "bg-danger text-dark",
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

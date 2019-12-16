import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContainerComponent } from "./components/dashboard/container.component";
import { RouteGuard } from "./guards/route.guard/route.guard.service";
import { UserManagementComponent } from "./components/user-management/user-management.component";
import { ReprioritizeComponent } from "./components/reprioritize/reprioritize.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { ScoreCardComponent } from "./components/task-management/score-card/score-card/score-card.component";
import { DrawModeComponent } from "./components/task-management/draw-mode/draw-mode.component";
import { AuditModeComponent } from "./components/task-management/audit-mode/audit-mode.component";
import { AuthGuard } from "./guards/auth.guard/auth.guard";
//score-draw --b
import { DrawScoreComponent } from './components/task-management/draw-score/draw-score.component';
//score draw --e

const routes: Routes = [
  {
    path: "",
    loadChildren:
      "./modules/authentication/authentication.module#AuthenticationModule"
  },
  {
    path: "MyScorecard",
    component: ScoreCardComponent,
    canActivate: [RouteGuard, AuthGuard],
    data: {
      breadcrumb: [{ label: "Actions" }, { label: "My Scorecard" }],
      expectedRoles: ["ADMIN", "AUDITOR", "PROCESSOR"]
    }
  },
  {
    path: "Dashboard",
    component: ContainerComponent,
    canActivate: [RouteGuard, AuthGuard],
    data: {
      breadcrumb: [{ label: "Dashboard" }, { label: "My Dashboard" }],
      expectedRoles: ["ADMIN", "AUDITOR"]
    }
  },
  {
    path: "UserManagement",
    component: UserManagementComponent,
    canActivate: [RouteGuard, AuthGuard],
    data: {
      breadcrumb: [{ label: "User Management" }, { label: "Manage Users" }],
      expectedRoles: ["ADMIN"]
    }
  },
  {
    path: "Reprioritize",
    component: ReprioritizeComponent,
    canActivate: [RouteGuard, AuthGuard],
    data: {
      breadcrumb: [{ label: "Prioritization" }, { label: "Reprioritize" }],
      expectedRoles: ["ADMIN"]
    }
  },
  {
    path: "Reports",
    component: ReportsComponent,
    canActivate: [RouteGuard, AuthGuard],
    data: {
      breadcrumb: [{ label: "Reports" }, { label: "My Reports" }],
      expectedRoles: ["ADMIN", "AUDITOR"]
    }
  },
  {
    path: "MyScorecard",
    component: ScoreCardComponent,
    canActivate: [RouteGuard, AuthGuard],
    data: {
      breadcrumb: [{ label: "Actions" }, { label: "My Scorecard" }],
      expectedRoles: ["ADMIN", "AUDITOR", "PROCESSOR"]
    }
  },
  {
    path: "DrawMode",
    component: DrawModeComponent,
    canActivate: [RouteGuard, AuthGuard],
    data: {
      breadcrumb: [{ label: "Actions" }, { label: "Draw Mode" }],
      expectedRoles: ["ADMIN", "AUDITOR", "PROCESSOR"]
    }
  },
  //score-draw --b
  {
    path: "DrawScore",
    component: DrawScoreComponent,
    canActivate: [RouteGuard, AuthGuard],
    data: {
      breadcrumb: [{ label: "Actions" }, { label: "Draw Score" }],
      expectedRoles: ["ADMIN", "AUDITOR", "PROCESSOR"]
    }
  },
  //score-draw --e
  {
    path: "AuditMode",
    component: AuditModeComponent,
    canActivate: [RouteGuard, AuthGuard],
    data: {
      breadcrumb: [{ label: "Actions" }, { label: "Audit Mode" }],
      expectedRoles: ["ADMIN", "AUDITOR"]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule { }

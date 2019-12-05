import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContainerComponent } from "./components/dashboard/container.component";
import { RouteGuard } from "./services/route.guard/route.guard.service";
import { TaskManagementComponent } from "./components/task-management/task-management.component";
import { UserManagementComponent } from "./components/user-management/user-management.component";
import { LoginComponent } from "./components/login/login/login.component";
import { ReprioritizeComponent } from "./components/reprioritize/reprioritize.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { ScoreCardComponent } from "./components/task-management/score-card/score-card/score-card.component";
import { DrawModeComponent } from "./components/task-management/draw-mode/draw-mode.component";
import { AuditModeComponent } from "./components/task-management/audit-mode/audit-mode.component";
const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "LandingPage",
    component: ScoreCardComponent,
    canActivate: [RouteGuard],
    data: {
      breadcrumb: [{label: 'Home'}, {label: 'My Scorecard'}]
    }
  },
  {
    path: "Dashboard",
    component: ContainerComponent,
    canActivate: [RouteGuard],
    data: {
      breadcrumb: [{label: 'Dashboard'}, {label: 'My Dashboard'}]
    }
  },
  {
    path: "UserManagement",
    component: UserManagementComponent,
    canActivate: [RouteGuard],
    data: {
      breadcrumb: [{label: 'User Management'}, {label: 'Manage Users'}]
    }
  },
  {
    path: "Reprioritize",
    component: ReprioritizeComponent,
    canActivate: [RouteGuard],
    data: {
      breadcrumb: [{label: 'Prioritization'}, {label: 'Reprioritize'}]
    }
  },
  {
    path: "Reports",
    component: ReportsComponent,
    canActivate: [RouteGuard],
    data: {
      breadcrumb: [{label: 'Reports'}, {label: 'My Reports'}]
    }
  },
  {
    path: "MyScorecard",
    component: ScoreCardComponent,
    canActivate: [RouteGuard],
    data: {
      breadcrumb: [{label: 'Actions'}, {label: 'My Scorecard'}]
    }
  },
  {
    path: "DrawMode",
    component: DrawModeComponent,
    canActivate: [RouteGuard],
    data: {
      breadcrumb: [{label: 'Actions'}, {label: 'Draw Mode'}]
    }
  },
  {
    path: "AuditMode",
    component: AuditModeComponent,
    canActivate: [RouteGuard],
    data: {
      breadcrumb: [{label: 'Actions'}, {label: 'Audit Mode'}]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule {}

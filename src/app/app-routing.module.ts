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
    canActivate: [RouteGuard]
  },
  {
    path: "Dashboard",
    component: ContainerComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "UserManagement",
    component: UserManagementComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "Reprioritize",
    component: ReprioritizeComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "Reports",
    component: ReportsComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "MyScorecard",
    component: ScoreCardComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "DrawMode",
    component: DrawModeComponent,
    canActivate: [RouteGuard]
  },
  {
    path: "AuditMode",
    component: AuditModeComponent,
    canActivate: [RouteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule {}

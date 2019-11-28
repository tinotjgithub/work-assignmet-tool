import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContainerComponent } from "./components/dashboard/container.component";
import { RouteGuard } from "./services/route.guard/route.guard.service";
import { TaskManagementComponent } from "./components/task-management/task-management.component";
import { UserManagementComponent } from "./components/user-management/user-management.component";
import { LoginComponent } from "./components/login/login/login.component";
import { ReprioritizeComponent } from "./components/reprioritize/reprioritize.component";
import { ReportsComponent } from './components/reports/reports.component';
const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "LandingPage",
    component: TaskManagementComponent
  },
  {
    path: "Dashboard",
    component: ContainerComponent
  },
  {
    path: "UserManagement",
    component: UserManagementComponent
  },
  {
    path: "Reprioritize",
    component: ReprioritizeComponent
  },
  {
    path: "Reports",
    component: ReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

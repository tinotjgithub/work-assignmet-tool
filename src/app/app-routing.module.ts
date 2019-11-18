import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContainerComponent } from "./components/dashboard/container.component";
import { RouteGuard } from "./services/route.guard/route.guard.service";
import { TaskManagementComponent } from "./components/task-management/task-management.component";
import { UserManagementComponent } from "./components/user-management/user-management.component";
const routes: Routes = [
  { path: "", component: TaskManagementComponent },
  {
    path: "Dashboard",
    component: ContainerComponent
  },
  {
    path: "UserManagement",
    component: UserManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

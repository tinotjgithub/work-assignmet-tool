import { AuthLoginComponent } from "./components/login/login.component";
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { TaskManagementComponent } from 'src/app/components/task-management/task-management.component';

export const routes: Routes = [
  // default route of the module
  { path: "", component: AuthLoginComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

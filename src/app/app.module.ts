import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ContainerComponent } from "./components/dashboard/container.component";
import { NavigationBarComponent } from "./components/navigation-bar/navigation-bar.component";
import bootstrap from "bootstrap";
import { SidebarDirective } from "./sidebar.directive";
import { RouteGuard } from "./services/route.guard/route.guard.service";
import { AuthService } from "./services/auth/auth.service";
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { DrawModeComponent } from './components/task-management/draw-mode/draw-mode.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    NavigationBarComponent,
    SidebarDirective,
    TaskManagementComponent,
    UserManagementComponent,
    DrawModeComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [RouteGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

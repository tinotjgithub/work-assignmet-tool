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
import { TaskManagementComponent } from "./components/task-management/task-management.component";
import { UserManagementComponent } from "./components/user-management/user-management.component";
import { DrawModeComponent } from "./components/task-management/draw-mode/draw-mode.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./services/auth/auth.interceptor";
import { LoginComponent } from "./components/login/login/login.component";
import { BaseHttpService } from "./services/base-http.service";

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
    DrawModeComponent,
    LoginComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    BaseHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

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
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { DrawModeComponent } from './components/task-management/draw-mode/draw-mode.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { BasicInfoComponent } from './components/user-management/basic-info/basic-info.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AssignRolesComponent } from './components/user-management/assign-roles/assign-roles.component';
import { AssignWbComponent } from './components/user-management/assign-wb/assign-wb.component';
import { LoginComponent } from './components/login/login/login.component';
import { BasicInfoService } from './components/user-management/services/basic-info.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    NavigationBarComponent,
    SidebarDirective,
    BasicInfoComponent,
    TaskManagementComponent,
    UserManagementComponent,
    DrawModeComponent,
    AssignRolesComponent,
    AssignWbComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    BasicInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

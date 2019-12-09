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
import { BasicInfoComponent } from "./components/user-management/basic-info/basic-info.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbModule, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { AssignRolesComponent } from "./components/user-management/assign-roles/assign-roles.component";
import { AssignWbComponent } from "./components/user-management/assign-wb/assign-wb.component";
import { TaskManagementComponent } from "./components/task-management/task-management.component";
import { UserManagementComponent } from "./components/user-management/user-management.component";
import { DrawModeComponent } from "./components/task-management/draw-mode/draw-mode.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./services/auth/auth.interceptor";
import { LoginComponent } from "./components/login/login/login.component";
import { BaseHttpService } from "./services/base-http.service";
import { DatePipe } from "@angular/common";
import { YesNoModelComponent } from "./components/yes-no-model/yes-no-model.component";
import { ReprioritizeComponent } from "./components/reprioritize/reprioritize.component";
import { ToastComponent } from "./components/toast.component";
import { GoogleChartsModule } from "angular-google-charts";
import { DateParserFormatter } from "./date-parser-formater";
import { ScoreCardComponent } from "./components/task-management/score-card/score-card/score-card.component";
import { AuditModeComponent } from "./components/task-management/audit-mode/audit-mode.component";
import { ReportsComponent } from "./components/reports/reports.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ReportPageComponent } from "./components/reports/report-page/report-page.component";
import { ListboxModule } from "primeng/listbox";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextModule } from "primeng/inputtext";
import { SidebarModule } from "primeng/sidebar";
import { PanelMenuModule } from "primeng/panelmenu";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
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
    LoginComponent,
    YesNoModelComponent,
    ReprioritizeComponent,
    ToastComponent,
    ScoreCardComponent,
    AuditModeComponent,
    ReportsComponent,
    ReportPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    ListboxModule,
    MultiSelectModule,
    InputTextModule,
    SidebarModule,
    PanelMenuModule,
    BreadcrumbModule,
    GoogleChartsModule.forRoot(),
    AuthenticationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: NgbDateParserFormatter, useClass: DateParserFormatter },
    BaseHttpService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

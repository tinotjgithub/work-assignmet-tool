import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import bootstrap from 'bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './components/dashboard/container.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login/login.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { DrawModeComponent } from './components/task-management/draw-mode/draw-mode.component';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { BaseHttpService } from './services/base-http.service';
import { SidebarDirective } from './sidebar.directive';

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
    BaseHttpService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

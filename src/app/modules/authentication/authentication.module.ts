import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const routes = [{ path: "", component: LoginComponent }];
@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ]
})
export class AuthenticationModule {}

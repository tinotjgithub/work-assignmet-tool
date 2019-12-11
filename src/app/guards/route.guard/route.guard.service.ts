import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.checkIsAuthenticated()) {
      return true;
    } else {
      this.router.navigateByUrl("/");
    }
  }
}

import { Injectable } from "@angular/core";
import { NotifierService } from "./notifier.service";
import {
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ErrorInterceptorService {
  constructor(private notifierServices: NotifierService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";
        if (error.error.message) {
          errorMessage = error.error.message;
        }

        this.notifierServices.throwNotification({
          type: "error",
          message: errorMessage
        });

        return throwError(error);
      })
    );
  }
}

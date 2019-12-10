import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NotifierService {
  private notifierListener = new Subject<{ type: string; message: string }>();

  getNotifierListener() {
    return this.notifierListener.asObservable();
  }

  throwNotification(notification) {
    alert('sdsadsad not')
    this.notifierListener.next({
      type: notification.type,
      message: notification.message
    });
  }

  notifierDismiss() {
    this.notifierListener.next(null);
  }
}

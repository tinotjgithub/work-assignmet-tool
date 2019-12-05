import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HeaderService {
  openSideMenu = true;
  private menuClickedSubj = new  Subject<boolean>();

  constructor() {}

  setSideMenuAction(value) {
    this.openSideMenu = value;
    this.menuClickedSubj.next(this.openSideMenu);
  }

  sideMenuClickedListener() {
    return this.menuClickedSubj.asObservable();
  }
}

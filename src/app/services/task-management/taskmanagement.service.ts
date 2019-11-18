import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TaskmanagementService {
  private tasks: any[] = [];
  private taskUpdatedSub = new Subject<any[]>();

  constructor(public http: HttpClient) {}

  getTaskListener() {
    return this.taskUpdatedSub.asObservable();
  }

  getPosts() {
    this.http
      .get<{ message: string; posts: any[] }>(
        "http://localhost:3000/api/posts/"
      )
      .subscribe(postData => {
        this.tasks = postData.posts;
        this.taskUpdatedSub.next([...this.tasks]);
      });
  }
}

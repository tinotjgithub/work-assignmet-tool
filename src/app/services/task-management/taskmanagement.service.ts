import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskmanagementService {

  constructor(public http: HttpClient) {

  }

  getPosts() {
    alert('hai');
    this.http.get('http://localhost:4200/api/posts').subscribe((data) => {
      console.log(data);
    })
  }

}

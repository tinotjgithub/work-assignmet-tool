import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const { SERVER_API_URL } = environment;

/**
 * Name: BaseHttpService
 * params: HttpClient
 * params: basePath
 * desc: All the generic services are hooked on to this service.
 */
@Injectable()
export class BaseHttpService {
  constructor(private httpClient: HttpClient) {}

  public get(segment?: string, parameters?: any): Observable<any> {
    return this.httpClient.get(
      `${SERVER_API_URL}${segment ? "/" + segment : ""}`,
      { params: parameters }
    );
  }

  public post(item, segment?: string, options?: object): Observable<any> {
    return this.httpClient.post(
      `${SERVER_API_URL}${segment ? "/" + segment : ""} `,
      item,
      options
    );
  }

  public delete(url: number): Observable<any> {
    return this.httpClient.delete(`${SERVER_API_URL}${url}`);
  }
}

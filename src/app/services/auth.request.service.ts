import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, clientId, clientSecret } from 'src/environments/init';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {
  constructor(
    private http:HttpClient,
    private user:UserService
  ) { }

  executeService(data, method, object, feature):Observable<any>{
    data = JSON.parse(JSON.stringify(data));

    if(this.user.isLoggedIn()) {
      data.user_id = this.user.getInfo().user_id;
      data.person_id = this.user.getInfo().person_id;
    }

    data.client_id = clientId;
    data.client_secret = clientSecret;
    const httpParams = new HttpParams().appendAll(data);

    return this.http.request(method, `${baseUrl}service/${object}/${feature}`, {body: httpParams});
  }

  get(data, object): Observable<any> {
    data = JSON.parse(JSON.stringify(data));

    if(this.user.isLoggedIn()) {
      data.user_id = this.user.getInfo().user_id;
      data.person_id = this.user.getInfo().person_id;
    }

    data.client_id = clientId;
    data.client_secret = clientSecret;
    const httpParams = new HttpParams({fromObject: data}).toString();

    return this.http.request("GET", `${baseUrl}get/${object}`, {params: data});
  }
}
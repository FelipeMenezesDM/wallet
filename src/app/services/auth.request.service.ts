import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { clientId, clientSecret } from 'src/environments/init';
import { UserService } from './user.service';
import { baseUrl } from 'src/environments/environment';

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
      data.userid = this.user.getInfo().userid;
      data.personid = this.user.getInfo().personid;
    }

    data.client_id = clientId;
    data.client_secret = clientSecret;
    const httpParams = new HttpParams().appendAll(data);

    return this.http.request(method, `${baseUrl}service/${object}/${feature}`, {body: httpParams});
  }

  get(data, object): Observable<any> {
    data = JSON.parse(JSON.stringify(data));

    if(this.user.isLoggedIn()) {
      data.userid = this.user.getInfo().userid;
      data.personid = this.user.getInfo().personid;
    }

    data.client_id = clientId;
    data.client_secret = clientSecret;
    const httpParams = new HttpParams({fromObject: data}).toString();

    return this.http.request("GET", `${baseUrl}get/${object}`, {params: data});
  }
}

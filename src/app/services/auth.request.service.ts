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
    data = JSON.parse(JSON.stringify(data))

    if(this.user.isLoggedIn()) {
      data.user_id = this.user.getInfo().user_id;
      data.person_id = this.user.getInfo().person_id;
    }

    const httpParams = new HttpParams()
    .appendAll(data)
    .append('client_id', clientId)
    .append('client_secret', clientSecret);

    return this.http.request(method, `${baseUrl}service/${object}/${feature}`, {body: httpParams});
  }
}
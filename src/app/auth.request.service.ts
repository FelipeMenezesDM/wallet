import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, clientId, clientSecret } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {
  constructor(private http:HttpClient) { }

  execute(data, method, object):Observable<any>{
    const httpParams = new HttpParams(object)
    .append("client_id", clientId)
    .append("client_secret", clientSecret);

    return this.http.request(method, `${baseUrl}service/signin`, {body: httpParams});
  }
}

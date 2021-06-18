import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, clientId, clientSecret } from 'src/environments/init';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {
  constructor(private http:HttpClient) { }

  executeService(data, method, object):Observable<any>{
    const httpParams = new HttpParams(object)
    .append("client_id", clientId)
    .append("client_secret", clientSecret);

    return this.http.request(method, `${baseUrl}service/${object}`, {body: httpParams});
  }
}

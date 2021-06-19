import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { baseUrl, clientId, clientSecret } from 'src/environments/init';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {
  constructor(private http:HttpClient) { }

  executeService(data, method, object):Observable<any>{
    const httpParams = new HttpParams()
    .appendAll(JSON.parse(JSON.stringify(data)))
    .append('client_id', clientId)
    .append('client_secret', clientSecret);

    return this.http.request(method, `${baseUrl}service/${object}`, {body: httpParams});
  }

  getUsersAutocomplete(fullname: string, object: string): Observable<string[]> {
    return this.http.get<UsersAC[]>(`${baseUrl}/autocomplete/${object}?client_id=${clientId}&client_secret=${clientSecret}`)
                    .pipe(map(list => list.map(({ fullname }) => fullname )));
  }
}

interface UsersAC {
  fullname: string;
  person_id: string;
  username: string;s
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(private http: HttpClient) { }

  getDetailsByIds(ids: object): Observable<any> {
    return this.http.post(`${environment.api}eng/ArtistSearch/GetArtistData`, ids);
  }

  getAllusersCountList(): Observable<any> {
    return this.http.get(`${environment.api}eng/SMS/GetAllCountList`);
  }

  getCaseDetails(caseKey): Observable<any> {
    return this.http.post(`${environment.api}eng/SMS/GetArtistDetailsList`, { type: caseKey });
  }

  sendSMS(message, subscribers): Observable<any>{
    return this.http.post(`${environment.api}eng/SMS/SendBulkSMS`, { message: message, subscribers: subscribers });
  }
}
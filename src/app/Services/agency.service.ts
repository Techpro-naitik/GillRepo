import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IAgencyResponseById } from 'app/Models/AgencyModel/AgencyModel';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }

  addAgency(data): Observable<any> {
    return this.http.post(`${environment.api}eng/Agency/Create`, data);
  }

  getAgencyById(id): Observable<IAgencyResponseById> {
    return this.http.get<IAgencyResponseById>(`${environment.api}eng/Agency/Details/${id}`);
  }

  editAgency(id, data): Observable<any> {
    return this.http.put(`${environment.api}eng/Agency/Update/${id}`, data);
  }

  deleteAgency(id): Observable<any> {
    return this.http.delete(`${environment.api}eng/Agency/Delete/${id}`);
  }

  // Agency rank Apis

  getAllAgencyRanks(): Observable<any> {
    return this.http.get(`${environment.api}eng/AgencyRank/GetAll`);
  }

  createAgencyRank(data): Observable<any>{
    return this.http.post(`${environment.api}eng/AgencyRank/Insert`, data);
  }

  deleteAgencyRank(id): Observable<any> {
    return this.http.delete(`${environment.api}eng/AgencyRank/Delete/${id}`);
  }

  editAgencyRank(id, data): Observable<any> {
    return this.http.put(`${environment.api}eng/AgencyRank/Update/${id}`, data);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ICastingNewsResponse, ICastingNewsResponseId } from 'app/Models/CastingNews/CastingNews';
import { IFaqResponse, IFaqResponseId } from 'app/Models/FaqModels/faq';

@Injectable({
  providedIn: 'root'
})
export class CastingService {

  constructor(private http: HttpClient) { }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }
    return parts.join('&');
  }

  getAllCastings(pn: number, ps: number): Observable<ICastingNewsResponse> {
    return this.http.get<ICastingNewsResponse>(`${environment.api}eng/CastingNews/GetAll?${this.toQueryString({ pageNumber: pn, pageSize: ps })}`);
  }

  getCastingById(id: number): Observable<ICastingNewsResponseId> {
    return this.http.get<ICastingNewsResponseId>(`${environment.api}eng/CastingNews/Get/${id}`);
  }

  deleteCastingById(id: number): Observable<any> {
    return this.http.delete(`${environment.api}eng/CastingNews/Delete/${id}`);
  }

  addCasting(data): Observable<any> {
    return this.http.post(`${environment.api}eng/CastingNews/Insert`, data);
  }

  editCastingById(id: number, data): Observable<any> {
    return this.http.put(`${environment.api}eng/CastingNews/Update/${id}`, data);
  }

  deleteAllCastingNews(ids): Observable<any> {
    let content = JSON.stringify(ids);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: content
    }
    return this.http.delete(`${environment.api}eng/CastingNews/DeleteAll`, options);
  }

  getFaq(pn: number, ps: number): Observable<IFaqResponse> {
    return this.http.get<IFaqResponse>(`${environment.api}eng/Faq/GetAll?${this.toQueryString({ pageNumber: pn, pageSize: ps })}`);
  }

  addFaq(data): Observable<any> {
    return this.http.post(`${environment.api}eng/Faq/Insert`, data);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${environment.api}eng/Faq/Delete/${id}`);
  }

  getFaqById(id: number): Observable<IFaqResponseId> {
    return this.http.get<IFaqResponseId>(`${environment.api}eng/Faq/Get/${id}`);
  }

  updatefaq(id: number, data): Observable<any> {
    return this.http.put(`${environment.api}eng/Faq/Update/${id}`, data)
  }

  deleteAllFaq(ids): Observable<any> {
    let content = JSON.stringify(ids);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: content
    }
    return this.http.delete(`${environment.api}eng/Faq/DeleteAll`, options);
  }

}
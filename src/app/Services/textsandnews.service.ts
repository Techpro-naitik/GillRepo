import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ITextsResponse, ITextsResponseId, INewsResponse, INewsResponseId } from 'app/Models/TextsAndNews/texstandnws';

@Injectable({
  providedIn: 'root'
})
export class TextsandnewsService {

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

  getAllTexts(): Observable<ITextsResponse> {
    return this.http.get<ITextsResponse>(`${environment.api}eng/Texts/GetAll?${this.toQueryString({ pageNumber: 0, pageSize: 20 })}`);
  }

  getTextById(id: number): Observable<ITextsResponseId> {
    return this.http.get<ITextsResponseId>(`${environment.api}eng/Texts/Get/${id}`);
  }

  deleteTextById(id: number): Observable<any> {
    return this.http.delete(`${environment.api}eng/Texts/Delete/${id}`);
  }

  addText(data): Observable<any> {
    return this.http.post(`${environment.api}eng/Texts/Insert`, data);
  }

  editTextById(id: number, data): Observable<any> {
    return this.http.put(`${environment.api}eng/Texts/Update/${id}`, data);
  }

  uploadTextImage(data) {
    return this.http.post(`${environment.api}eng/Files/Upload`, data);
  }

  deleteAllTexts(ids): Observable<any> {
    let content = JSON.stringify(ids);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: content
    }
    return this.http.delete(`${environment.api}eng/Texts/DeleteAll`, options);
  }

  getAllNews(): Observable<INewsResponse> {
    return this.http.get<INewsResponse>(`${environment.api}eng/SiteNews/GetAll?${this.toQueryString({ pageNumber: 0, pageSize: 20 })}`);
  }

  getNewsById(id: number): Observable<INewsResponseId> {
    return this.http.get<INewsResponseId>(`${environment.api}eng/SiteNews/Get/${id}`);
  }

  deleteNewsById(id: number): Observable<any> {
    return this.http.delete(`${environment.api}eng/SiteNews/Delete/${id}`);
  }

  addNews(data): Observable<any> {
    return this.http.post(`${environment.api}eng/SiteNews/Insert`, data);
  }

  editNewsById(id: number, data): Observable<any> {
    return this.http.put(`${environment.api}eng/SiteNews/Update/${id}`, data);
  }

  deleteAllNews(ids): Observable<any> {
    let content = JSON.stringify(ids);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: content
    }
    return this.http.delete(`${environment.api}eng/SiteNews/DeleteAll`, options);
  }
}
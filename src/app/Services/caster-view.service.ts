import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CasterViewService {

  constructor(private http: HttpClient) { }

  // Caster View Apis
  createCasterView(data): Observable<any> {
    return this.http.post(`${environment.api}eng/Audition/CasterViewInsert`, data);
  }

  getCasterDetails(id: number): Observable<{ status: string, message: string, data: Array<object> }> {
    return this.http.get<{ status: string, message: string, data: Array<object> }>(`${environment.api}eng/Audition/CasterViewGetById/${id}`);
  }

  updateCasterView(data, id): Observable<any> {
    return this.http.put(`${environment.api}eng/Audition/CasterViewUpdateById/${id}`, data);
  }

  deleteCasterView(data, id): Observable<any> {
    return this.http.put(`${environment.api}eng/Audition/CasterViewDeleteById/${id}`, data);
  }

  // CatserViewPage APIs

  createCasterViewPage(data): Observable<any> {
    return this.http.post(`${environment.api}eng/Audition/CreatePagesForArtistRoles`, data);
  }

  getRolesForPages(cId, pn, ps): Observable<{ status: string, message: string, data: { casterData: Array<object>, totalCount: number } }> {
    return this.http.get<{ status: string, message: string, data: { casterData: Array<object>, totalCount: number } }>(`${environment.api}eng/Audition/GetRolesForArtist/${cId}?pageNumber=${pn}&pageSize=${ps}`);
  }

  getArtistForOtherRoles(audId: number, cvpId: number, pn, ps): Observable<any> {
    return this.http.get(`${environment.api}eng/Audition/GetArtistAfterRoles?AuditionId=${audId}&CasterViewPageId=${cvpId}&pageNumber=${pn}&pageSize=${ps}`);
  }

  getArtistForRoles(audId: number, cvpId: number, pn, ps): Observable<any> {
    return this.http.get(`${environment.api}eng/Audition/GetCasterApplicationDataAfterRoles?AuditionId=${audId}&CasterViewPageId=${cvpId}&pageNumber=${pn}&pageSize=${ps}`);
  }

  getPreviewData(id: number): Observable<{ status: string, message: string, data: Array<object> }> {
    return this.http.post<{ status: string, message: string, data: Array<object> }>(`${environment.api}eng/Audition/PreviewData`, { casterViewId: id });
  }

  getPreviewPermissions(cvId: number, audId: number): Observable<any> {
    return this.http.get(`${environment.api}eng/Audition/PreviewDetails?AuditionId=${audId}&CasterViewId=${cvId}`);
  }
  generateHTMLFiles(data): Observable<any> {
    return this.http.post(`${environment.api}eng/Audition/GenerateHtml`, data);
  }

  updatePages(data): Observable<{ status: string, message: string, data: any }> {
    return this.http.put<{ status: string, message: string, data: any }>(`${environment.api}eng/Audition/PagesUpdate`, { pagesContent: data });
  }

  deletePages(ids): Observable<any> {
    let content = JSON.stringify(ids);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: content
    }
    return this.http.delete(`${environment.api}eng/Audition/PagesDeleteAll`, options);
  }

  updateArtists(data): Observable<{ status: string, message: string, data: any }> {
    return this.http.put<{ status: string, message: string, data: any }>(`${environment.api}eng/Audition/ArtistDetailsUpdate`, { artistContent: data });
  }

  deleteArtists(ids): Observable<any> {
    let content = JSON.stringify(ids);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: content
    }
    return this.http.delete(`${environment.api}eng/Audition/ArtistDetailsDeleteAll`, options);
  }

  sendEmailToCaster(data): Observable<{ status: string, message: string, data: any }> {
    return this.http.post<{ status: string, message: string, data: any }>(`${environment.api}eng/Audition/SendEmailToCaster`, data);
  }

  sendEmailToArtist(data): Observable<{ status: string, message: string, data: any }> {
    return this.http.post<{ status: string, message: string, data: any }>(`${environment.api}eng/Audition/SendEmailToArtist`, data);
  }

  changeRoleForArtist(data): Observable<any>{
    return this.http.post<{ status: string, message: string, data: any }>(`${environment.api}eng/Audition/changeRoleForArtist`, data);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AllAgencyResponse } from './Models/AgencyModel/AgencyModel';
import { ApiResponseModel, ApiResponseModelForArtist, ArtistSearchByTerm } from './Models/ArtistModel/model';
import { SearchResultApi } from './Models/ArtistSearchModel/ArtistSearch';
import { INotification, INotificationById } from './Models/NotificationModel/model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // agenciesList: BehaviorSubject<GetAllAgencyModel[]> = new BehaviorSubject<GetAllAgencyModel[]>([]);

  constructor(public http: HttpClient) {
    // this.getAgencies();
  }

  login(loginFormvalue): Observable<any> {
    return this.http.post(`${environment.api}admin/login`, loginFormvalue);
  }
  webAnalytics(formValue): Observable<any> {
    return this.http.post(`${environment.api}eng/artist/create`, formValue);
  }


  artist() {
    return this.http.get<ApiResponseModel>(`${environment.api}eng/artist/all`);
  }

  artistDetail(id) {
    return this.http.get<ApiResponseModelForArtist>(`${environment.api}eng/artist/details/${id}`);
  }

  deleteArtist(id): Observable<any> {
    return this.http.delete(`${environment.api}eng/artist/delete/${id}`);
  }

  Update(id, formValue): Observable<any> {
    return this.http.put(`${environment.api}eng/artist/update/${id}`, formValue);
  }

  allAgency() {
    return this.http.get<AllAgencyResponse>(`${environment.api}eng/agency/AllDetails`);
  }

  // getAgencies() {
  //   this.http.get<AllAgencyResponse>(`${environment.api}eng/agency/AllDetails`).subscribe(response => {
  //     if (response && response.status === "success") {
  //       this.agenciesList.next(response.data);
  //     }
  //   })
  // }


  deleteAllAgency(ids): Observable<any> {
    let content = JSON.stringify(ids);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: content
    }
    return this.http.delete(`${environment.api}eng/Agency/DeleteAll`, options);
  }

  ArtistTextUpdate(formValue, id): Observable<any> {
    return this.http.put(`${environment.api}eng/artist/TextUpdate/${id}`, formValue);
  }

  artistCapabilitesUpdate(id, data: Array<any>): Observable<any> {
    return this.http.put(`${environment.api}eng/Artist/UpdateProp5Artist`, {
      ArtistId: id,
      values: data
    });
  }

  EditPhysicalInfo(CharValue, id): Observable<any> {
    return this.http.put(`${environment.api}eng/artist/PhysicalUpdate/${id}`, CharValue);
  }

  getAllNotifications(pn, ps, flag): Observable<INotification> {
    return this.http.get<INotification>(`${environment.api}Notification/GetAll?${this.toQueryString(
      { pageNumber: pn, pageSize: ps, showUncompleted: flag }
    )}`);
  }

  getNotificationDataById(id): Observable<INotificationById> {
    return this.http.get<INotificationById>(`${environment.api}Notification/Get?pdataId=${id}`);
  }

  deleteNotificationById(id): Observable<any> {
    return this.http.delete(`${environment.api}Notification/Delete?pdataId=${id}`);
  }

  deleteMultipleNotifications(data): Observable<any> {
    let content = JSON.stringify(data);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: content
    }
    return this.http.delete(`${environment.api}Notification/DeleteAll`, options);
  }

  markAsViewed(data): Observable<any> {
    return this.http.post(`${environment.api}Notification/MarkViewed?pdataId=${data}`, data);
  }

  markAsCompletedOrUncompleted(data, val): Observable<any> {
    return this.http.post(`${environment.api}Notification/SetCompleted?val=${val}`, data);
  }

  setReadUnread(data, val): Observable<any> {
    return this.http.post(`${environment.api}Notification/SetUnreadFlag?val=${val}`, data);
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }
    return parts.join('&');
  }

  uploadArtistPhoto(data): Observable<any> {
    return this.http.post(`${environment.api}eng/Files/Upload`, data);
  }

  saveArtistPhoto(data): Observable<any> {
    return this.http.post(`${environment.api}eng/Artist/AddArtistPicture`, data);
  }

  artistSearchByTerm(term) {
    return this.http.post<ArtistSearchByTerm>(`${environment.api}eng/ArtistSearch/AutoComplete?term=${term}`, null);
  }

  editArtistPhoto(data): Observable<any> {
    return this.http.put(`${environment.api}eng/Artist/UpdateArtistPicture`, data);
  }

  addArtistSubscription(data): Observable<any> {
    return this.http.post(`${environment.api}eng/Manuy/UpdateTypeColorJub`, data);
  }

  getYTJSON(base: string, url: string): Observable<any> {
    let finalUrl = this.toQueryString({
      format: 'json',
      maxwidth: '100',
      maxheight: '100',
      url: url
    });
    return this.http.post(`${environment.api}eng/ArtistEmbed/Create`, {
      url: `${base}${finalUrl}`
    });
  }

  saveArtistEmbeds(data): Observable<any> {
    return this.http.post(`${environment.api}eng/ArtistEmbed/AddArtistEmbeds`, data);
  }

  editArtistEmbeds(data): Observable<any> {
    return this.http.put(`${environment.api}eng/Artist/UpdateArtistEmbeds`, data);
  }

  searchArtists(data, pn: number, ps: number) {
    return this.http.post<SearchResultApi>(`${environment.api}eng/ArtistSearch/Search?pageNumber=${pn}&pageSize=${ps}`, data);
  }

  getAllArtistsForMessage(pn: number) {
    return this.http.get(`${environment.api}eng/MessageSystem/GetAll?pageNumber=${pn}&pageSize=20`);
  }

  searchRecipients(data) {
    return this.http.post(`${environment.api}eng/MessageSystem/Search`, data);
  }

  artistHandle(id: number): Observable<{ status: string, message: string, data: any }> {
    return this.http.put<{ status: string, message: string, data: any }>(`${environment.api}eng/Artist/LeadUpdateById/${id}`, null)
  }

  generateHTMLPage(data): Observable<{ status: string, message: string, data: string }> {
    return this.http.post<{ status: string, message: string, data: string }>(`${environment.api}eng/Files/GenerateHtmlPage`, { content: data });
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CasterApiModel, AudtionTypeApiModel, AudtionTopicApiModel, ICasterId } from 'app/Models/CasterModel/model';
import { IAuditionBudgetResponse, IAuditionResponse } from 'app/Models/AuditionBudgetModel/model';

@Injectable({
  providedIn: 'root'
})
export class AuditionService {

  constructor(private http: HttpClient) { }

  // Apis for audition topic, audition type, casters

  getAuditionTypes() {
    return this.http.get<AudtionTypeApiModel>(`${environment.api}eng/AuditionType/Get`);
  }

  getAuditionTopic() {
    return this.http.get<AudtionTopicApiModel>(`${environment.api}eng/AuditionTopic/Get`);
  }

  getCasters() {
    return this.http.get<CasterApiModel>(`${environment.api}eng/Caster/Get`)
  }

  createCaster(data): Observable<any> {
    return this.http.post(`${environment.api}eng/Caster/Insert`, data);
  }

  editCaster(data): Observable<any> {
    return this.http.put(`${environment.api}eng/Caster/Update`, data);
  }

  getCasterDataById(id): Observable<ICasterId> {
    return this.http.get<ICasterId>(`${environment.api}eng/Caster/GetById/${id}`);
  }

  deleteCaster(id): Observable<any> {
    return this.http.delete(`${environment.api}eng/Caster/Delete/${id}`);
  }

  addAuditiontype(data): Observable<any> {
    return this.http.post(`${environment.api}eng/AuditionType/Insert`, data);
  }

  addAuditionTopic(data): Observable<any> {
    return this.http.post(`${environment.api}eng/AuditionTopic/Insert`, data);
  }

  editAuditiontype(id, data): Observable<any> {
    return this.http.put(`${environment.api}eng/AuditionType/Update/${id}`, data);
  }

  editAuditionTopic(id, data): Observable<any> {
    return this.http.put(`${environment.api}eng/AuditionTopic/Update/${id}`, data);
  }

  deleteAuditiontype(id): Observable<any> {
    return this.http.delete(`${environment.api}eng/AuditionType/Delete/${id}`);
  }

  deleteAuditionTopic(id): Observable<any> {
    return this.http.delete(`${environment.api}eng/AuditionTopic/Delete/${id}`);
  }

  getAuditionBudget(): Observable<IAuditionBudgetResponse> {
    return this.http.get<IAuditionBudgetResponse>(`${environment.api}eng/AuditionBudget/Get`);
  }

  deleteAllTopics(ids): Observable<any> {
    let content = JSON.stringify(ids);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: content
    }
    return this.http.delete(`${environment.api}eng/AuditionTopic/DeleteAll`, options);
  }

  deleteAllCasters(ids): Observable<any> {
    let content = JSON.stringify(ids);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: content
    }
    return this.http.delete(`${environment.api}eng/Caster/DeleteAll`, options);
  }

  // Audition realted Apis

  sendAuditionInvite(data, id): Observable<any> {
    return this.http.post(`${environment.api}eng/Audition/SendAuditionInvitation`, {
      artistIds: data,
      auditionId: id
    })
  }

  getAllAuditions(pn, ps, text, flag): Observable<any> {
    return this.http.get<any>(`${environment.api}eng/Audition/GetAll?pageNumber=${pn}&pageSize=${ps}&title=${text}&flag=${flag}`);
  }

  getAuditionById(id: number): Observable<IAuditionResponse> {
    return this.http.get<IAuditionResponse>(`${environment.api}eng/Audition/AuditionGetById/${id}`);
  }

  addAudition(data): Observable<IAuditionResponse> {
    return this.http.post<IAuditionResponse>(`${environment.api}eng/Audition/AuditionInsert`, data);
  }

  updateAudition(data, id): Observable<IAuditionResponse> {
    return this.http.put<IAuditionResponse>(`${environment.api}eng/Audition/AuditionUpdateById/${id}`, data);
  }

  deleteAllAuditions(data): Observable<any> {
    let content = JSON.stringify(data);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: content
    }
    return this.http.delete(`${environment.api}eng/Audition/AuditionDeleteAll`, options);
  }

  deleteSingleAudition(id): Observable<any> {
    return this.http.delete(`${environment.api}eng/Audition/AuditionDeleteById/${id}`);
  }

  // Audition Role related API Calls

  addRolesForAudition(data): Observable<{ status: string, message: string, data: number }> {
    return this.http.post<{ status: string, message: string, data: number }>(`${environment.api}eng/Audition/RoleInsert`, data);
  }

  updateRolesForAudition(data, id): Observable<{ status: string, message: string, data: number }> {
    return this.http.put<{ status: string, message: string, data: number }>(`${environment.api}eng/Audition/RoleUpdateById/${id}`, data);
  }

  getRolesByAuditionId(id: number): Observable<{ status: string, message: string, data: Array<object> }> {
    return this.http.get<{ status: string, message: string, data: Array<object> }>(`${environment.api}eng/Audition/RoleGetById/${id}`);
  }

  deleteRoleById(id: number): Observable<{ status: string, message: string, data: number }> {
    return this.http.delete<{ status: string, message: string, data: number }>(`${environment.api}eng/Audition/RoleDeleteById/${id}`);
  }

  // Audition subscribtion related API calls

  getSubscriptionData(id: number): Observable<{ status: string, message: string, data: Array<any> }> {
    return this.http.get<{ status: string, message: string, data: Array<any> }>(`${environment.api}eng/Audition/GetSubscriptionsDetails/${id}`)
  }

  deleteSusbcription(ids): Observable<any> {
    let content = JSON.stringify(ids);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: content
    }
    return this.http.delete(`${environment.api}eng/Audition/InvitedArtistDeleteAll`, options);
  }

  resumePauseSubscription(data): Observable<any> {
    return this.http.put(`${environment.api}eng/Audition/ArtistPauseResumeSubscription`, data);
  }

  approveAudition(id: number): Observable<any> {
    return this.http.put(`${environment.api}eng/Audition/ApproveAudition/${id}`, null);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CharApiModel, BaseModelProps, ISubscriptionResponse } from 'app/Models/MasterDataModel/model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class MasterdataService {

  constructor(private http: HttpClient) { }

  getAllCharacteristicsData() {
    return this.http.get<CharApiModel>(`${environment.api}eng/masterdata/GetCharValues`);
  }

  getAllPropsData() {
    return this.http.get<BaseModelProps>(`${environment.api}eng/MasterData/GetProp5Values`);
  }

  editCharParentValue(id, data): Observable<any> {
    return this.http.put(`${environment.api}eng/MasterData/UpdateCharacteristicsValues/${id}`, data);
  }

  editCharValue(id, data): Observable<any> {
    return this.http.put(`${environment.api}eng/MasterData/UpdateCharValues/${id}`, data);
  }

  deleteCharValues(id): Observable<any> {
    return this.http.delete(`${environment.api}eng/MasterData/DeleteCharValues/${id}`);
  }

  deleteCharParent(id): Observable<any> {
    return this.http.delete(`${environment.api}eng/MasterData/DeleteCharacteristic/${id}`);
  }

  addCharacteristicsValues(data): Observable<any> {
    return this.http.post(`${environment.api}eng/MasterData/AddCharacteristicValues`, data);
  }

  getAllSubscriptions(): Observable<ISubscriptionResponse> {
    return this.http.get<ISubscriptionResponse>(`${environment.api}eng/manuy/Get`);
  }

  addSubscription(data): Observable<any> {
    return this.http.post(`${environment.api}eng/manuy/post`, data);
  }

  editSubscription(data): Observable<any> {
    return this.http.put(`${environment.api}eng/manuy/Update`, data);
  }

  deleteSubscription(id): Observable<any> {
    return this.http.delete(`${environment.api}eng/manuy/Delete?id=${id}`);
  }

  deleteProp5Parent(id): Observable<any> {
    return this.http.delete(`${environment.api}eng/MasterData/DeleteProp5Values/${id}`);
  }

  addProp5value(data): Observable<any> {
    return this.http.post(`${environment.api}eng/MasterData/AddProp5Values`, data);
  }

  editProp5value(data, id): Observable<any> {
    return this.http.put(`${environment.api}eng/MasterData/UpdateProp5Values/${id}`, data);
  }

  deleteAllProps(ids): Observable<any>{
    let content = JSON.stringify(ids);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: content
    }
    return this.http.delete(`${environment.api}eng/MasterData/DeleteAll`, options);
  }
}
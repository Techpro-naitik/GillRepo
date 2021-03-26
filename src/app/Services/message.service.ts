import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { IMessageResponse } from 'app/Models/MessageSystem Model/message';
import { SearchMessages } from 'app/Models/DashboardModel/model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getAllMessages(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.api}eng/MessageSystem/GetAllMessages?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  addMessage(data): Observable<any> {
    return this.http.post(`${environment.api}eng/MessageSystem/AddMessages`, data);
  }

  updateReaddate(id: number): Observable<any> {
    return this.http.put(`${environment.api}eng/MessageSystem/UpdateReadDate/${id}`, null);
  }

  getMessagById(id: number): Observable<IMessageResponse> {
    return this.http.get<IMessageResponse>(`${environment.api}eng/MessageSystem/GetMsgByIdDetails/${id}`);
  }

  deleteMessagebyId(id: number): Observable<IMessageResponse> {
    return this.http.delete<IMessageResponse>(`${environment.api}eng/MessageSystem/Delete/${id}`);
  }

  updateMessagebyId(id: number, data): Observable<IMessageResponse> {
    return this.http.put<IMessageResponse>(`${environment.api}eng/MessageSystem/Update/${id}`, data);
  }

  uploadFile(formdata: FormData): Observable<IMessageResponse> {
    return this.http.post<IMessageResponse>(`${environment.api}eng/Files/UploadFiles`, formdata);
  }

  getAllFiles(): Observable<IMessageResponse> {
    return this.http.get<IMessageResponse>(`${environment.api}eng/Files/GetAll`);
  }

  deleteFileById(id): Observable<IMessageResponse> {
    return this.http.delete<IMessageResponse>(`${environment.api}eng/Files/DeleteById/${id}`);
  }

  getMessageTypes(): Observable<any> {
    return this.http.get<IMessageResponse>(`${environment.api}eng/MessageSystem/GetAllMessagesTypes`);
  }

  searchForMessages(data: SearchMessages): Observable<any> {
    return this.http.post(`${environment.api}eng/MessageSystem/MessageSearch`, data);
  }
}

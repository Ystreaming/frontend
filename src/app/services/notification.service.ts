import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INotification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) { }

  getAllNotifications(): Observable<INotification[]> {
    return this.http.get<INotification[]>(this.apiUrl);
  }

  createNotification(notificationData: INotification): Observable<INotification> {
    return this.http.post<INotification>(this.apiUrl, notificationData);
  }

  getNotificationById(id: number): Observable<INotification> {
    return this.http.get<INotification>(`${this.apiUrl}/${id}`);
  }

  updateNotificationById(id: number, notificationData: INotification) {
    return this.http.put<INotification>(`${this.apiUrl}/${id}`, notificationData);
  }

  deleteNotificationById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

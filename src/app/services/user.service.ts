import { IUser } from './../models/user.model';
import { IChannel } from 'src/app/models/channel.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }

  updateUserById(id: number, userData: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${id}`, userData);
  }

  deleteUserById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getSubByUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sub/${id}`);
  }
  
  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/username/${username}`);
  }

  createSub(idChannel: string): Observable<any> {
    let userId = this.localStorageService.getUserDetails();
    return this.http.patch(`${this.apiUrl}/sub/${userId}`, { subId: idChannel });
  }
}

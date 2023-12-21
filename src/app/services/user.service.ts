import { IUser } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
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

  loginUser(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login`, { username, password });
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<IUser> {
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

  isAuthenticated(): boolean {
    return this.localStorageService.get('token') !== null;
  }
}

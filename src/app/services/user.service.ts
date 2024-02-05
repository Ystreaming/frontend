import { IUser } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
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

  getUserChannel(userId: string): Observable<string | null> {
    return this.http.get<{id: string} | null>(`${environment.apiUrl}/channels/user/${userId}`).pipe(
        map(response => response ? response.id : null),
        catchError(() => of(null))
    );
  }
}

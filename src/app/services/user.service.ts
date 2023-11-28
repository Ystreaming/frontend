import { IUser } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user);
  }

  loginUser(email: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/login`, { email, password });
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
}

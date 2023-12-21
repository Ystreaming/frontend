import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRole } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(this.apiUrl);
  }

  getRoleById(id: number): Observable<IRole> {
    return this.http.get<IRole>(`${this.apiUrl}/${id}`);
  }

  createRole(roleData: IRole): Observable<IRole> {
    return this.http.post<IRole>(this.apiUrl, roleData);
  }

  updateRoleById(id: number, roleData: IRole): Observable<IRole> {
    return this.http.put<IRole>(`${this.apiUrl}/${id}`, roleData);
  }

  deleteRoleById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

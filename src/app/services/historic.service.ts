import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHistoric } from '../models/historic.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  private apiUrl = `${environment.apiUrl}/historics`;

  constructor(private http: HttpClient) { }

  getAllHistorics(): Observable<IHistoric[]> {
    return this.http.get<IHistoric[]>(this.apiUrl);
  }

  createHistoric(historicData: IHistoric): Observable<IHistoric> {
    return this.http.post<IHistoric>(this.apiUrl, historicData);
  }

  getHistoricById(id: number): Observable<IHistoric> {
    return this.http.get<IHistoric>(`${this.apiUrl}/${id}`);
  }

  updateHistoricById(id: number, historicData: IHistoric): Observable<IHistoric> {
    return this.http.put<IHistoric>(`${this.apiUrl}/${id}`, historicData);
  }

  deleteHistoricById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

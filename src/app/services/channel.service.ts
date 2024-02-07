import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IChannel } from '../models/channel.model';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private apiUrl = `${environment.apiUrl}/channels`;

  constructor(private http: HttpClient) { }

  getAllChannels(): Observable<IChannel[]> {
    return this.http.get<IChannel[]>(this.apiUrl);
  }

  createChannel(channelData: any, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', imageFile);
    formData.append('idUser', channelData.idUser);
    formData.append('name', channelData.name);
    formData.append('description', channelData.description);

    return this.http.post(`${this.apiUrl}`, formData);
  }

  getChannelById(id: string): Observable<IChannel> {
    return this.http.get<IChannel>(`${this.apiUrl}/${id}`);
  }

  updateChannelById(id: string, channelData: IChannel): Observable<IChannel> {
    return this.http.put<IChannel>(`${this.apiUrl}/${id}`, channelData);
  }

  deleteChannelById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchChannelByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/${username}`);
  }

  getChannelByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
}

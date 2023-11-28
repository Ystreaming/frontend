import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IVideo } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private apiUrl = `${environment.apiUrl}/videos`;

  constructor(private http: HttpClient) { }

  getAllVideos(): Observable<IVideo[]> {
    return this.http.get<IVideo[]>(this.apiUrl);
  }

  createVideo(videoData: IVideo): Observable<IVideo> {
    return this.http.post<IVideo>(this.apiUrl, videoData);
  }

  getVideoById(id: number): Observable<IVideo> {
    return this.http.get<IVideo>(`${this.apiUrl}/${id}`);
  }

  updateVideoById(id: number, videoData: IVideo): Observable<IVideo> {
    return this.http.put<IVideo>(`${this.apiUrl}/${id}`, videoData);
  }

  deleteVideoById(id: number): Observable<IVideo> {
    return this.http.delete<IVideo>(`${this.apiUrl}/${id}`);
  }
}

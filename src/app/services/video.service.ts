import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IVideo } from '../models/video.model';
import { IComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private apiUrl = `${environment.apiUrl}/videos`;

  constructor(private http: HttpClient) { }

  getAllVideos(limit?: number): Observable<any> {
    let url = this.apiUrl;
    if (limit !== undefined) {
        url += `?limit=${limit}`;
    }
    return this.http.get<any>(url);
  }

  createVideo(videoData: IVideo): Observable<IVideo> {
    return this.http.post<IVideo>(this.apiUrl, videoData);
  }

  getVideoById(id: string): Observable<any> {
    return this.http.get<IVideo>(`${this.apiUrl}/${id}`);
  }

  updateVideoById(id: number, videoData: IVideo): Observable<IVideo> {
    return this.http.put<IVideo>(`${this.apiUrl}/${id}`, videoData);
  }

  deleteVideoById(id: number): Observable<any> {
    return this.http.delete<IVideo>(`${this.apiUrl}/${id}`);
  }

  getCommentsByVideoId(id: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.apiUrl}/comments/${id}`);
  }

  getRecommendation(limit?: number): Observable<any> {
    let params = "";
    if (limit !== undefined) {
        params += `?limit=${limit}`;
    }
    return this.http.get<any>(`${this.apiUrl}/recommendation${params}`);
  }

  getMostViewed(limit?: number): Observable<any> {
    let params = "";
    if (limit !== undefined) {
        params += `?limit=${limit}`;
    }
    return this.http.get<any>(`${this.apiUrl}/mostviewed${params}`);
  }

  getVideosByCategory(id: string, limit: number): Observable<any> {
    let params = "";
    if (limit !== undefined) {
        params += `?limit=${limit}`;
    }
    return this.http.get<any>(`${this.apiUrl}/category/${id}${params}`);
  }

  getVideosByName(name: string | null, limit: number): Observable<any> {
    let params = "";
    if (limit !== undefined) {
        params += `?limit=${limit}`;
    }
    return this.http.get<any>(`${this.apiUrl}/search/${name}${params}`);
  }

  getStreamVideo(id: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'video/mp4',
      'Accept': 'video/*'
    });

    return this.http.get(`${this.apiUrl}/stream/${id}`, {
      headers: headers,
      responseType: 'blob',
      observe: 'body',
    });
  }
}

import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
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

  createVideo(videoData: FormData): Observable<HttpEvent<IVideo>> {
    return this.http.post<IVideo>(this.apiUrl, videoData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'json'
    }).pipe(
        catchError((error: any) => {
          console.error('Erreur du serveur :', error);
          return new Observable<HttpEvent<IVideo>>(observer => {
            observer.error('Erreur du serveur. Veuillez réessayer.');
          });
        })
    );
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

  getStreamVideo(id: string): string {
    return `${this.apiUrl}/stream/${id}`;
  }
}

export class Video {
}
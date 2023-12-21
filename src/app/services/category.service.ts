import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${environment.apiUrl}/Category`;

  constructor(private http: HttpClient) { }

  getAllCategories(limit?: number): Observable<any> {
    let url = this.apiUrl;
    if (limit !== undefined) {
        url += `?limit=${limit}`;
    }
    return this.http.get<any>(url);
  }

  createCategory(categoryData: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(this.apiUrl, categoryData);
  }

  getCategoryById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiUrl}/${id}`);
  }

  updateCategoryById(id: number, categoryData: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.apiUrl}/${id}`, categoryData);
  }

  deleteCategoryById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}

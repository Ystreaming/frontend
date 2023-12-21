import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  getUserDetails() {
    const token = this.get('token');
    if (token) {
      const decodedToken = jwtDecode<MyJWTPayload>(token);
      return decodedToken.id;
    }
    return null;
  }

}

export interface MyJWTPayload {
  id: string,
  iat: number,
  exp: number
}

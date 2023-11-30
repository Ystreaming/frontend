import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from "@angular/core";
import { LocalStorageService } from '../services/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsNotSignedInGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.localStorageService.get('token');

    if (token !== null) {
      this.router.navigate(["/"]);
    }

    return true;
  }
}
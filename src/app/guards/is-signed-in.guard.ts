import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { LocalStorageService } from "../services/local-storage.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.localStorageService.get('token');

    if (token === null) {
      // TODO: Redirect to login
    }

    return true;
  }
}
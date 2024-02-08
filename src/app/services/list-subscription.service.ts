import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListSubscriptionService {
  private refreshListSubject = new Subject<any>();
  public refreshListObservable = this.refreshListSubject.asObservable();

  public refreshComponent() {
    this.refreshListSubject.next('');
  }
}

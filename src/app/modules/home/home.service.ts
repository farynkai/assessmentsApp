import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  userToEdit = new BehaviorSubject({});
  updatedData = new Subject();
  constructor() {}
}

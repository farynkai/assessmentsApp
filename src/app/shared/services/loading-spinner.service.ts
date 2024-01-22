import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  isLoading =  new BehaviorSubject<boolean>(false);
  constructor() { }
}

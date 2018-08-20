import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * MethodsService class
 * @constructor MethodsService
 * 
 */
export class MethodsService {

  constructor() { }
  
  private componentMethodCallSource = new Subject<any>();
  
  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  /** Allows a call from one component to subscribe to another */
  callComponentMethod() {
    this.componentMethodCallSource.next();
  }

}

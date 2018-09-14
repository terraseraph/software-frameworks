import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MongoService {
  public api = "http://software-frameworks-terraseraph.c9users.io:8081/products/"
  constructor(private http: Http) { }
  
  /** Load all product */
  get_all_products(): Observable<any>{
    console.log(data)
    return this.http.get(this.api, result)
  }  
  
  /** Load product */
  search_products(data): Observable<any>{
    return this.http.get(this.api + data, result)
  }
  
  /** Create product */
  create_product(data): Observable<any>{
    return this.http.post(this.api, data, result)
  }  
  
  /** Update product */
  update_product(data): Observable<any>{
    return this.http.put(this.api, data, result)
  }
  
  /** Remove a product */
  remove_product(data): Observable<any>{
    return this.http.delete(this.api + data, result)
  }  
  
}


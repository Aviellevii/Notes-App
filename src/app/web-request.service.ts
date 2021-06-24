import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly 'ROOT_URL':string='http://localhost:3000';
  constructor(private http:HttpClient) { }
  
  get(url:string){
    return this.http.get(this.ROOT_URL +url);
  }
  post(url:string,payload:Object){
    return this.http.post(this.ROOT_URL + url,payload);
  }
  patch(url:string,payload:Object){
    return this.http.patch(this.ROOT_URL + url,payload);
  }
  delete(url:string){
    return this.http.delete(this.ROOT_URL +url);
  }
}

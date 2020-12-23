import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, delay, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';



export interface Usuario{
  user: string;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url ="http://119.8.144.182:1035/api/loginfirma";
  constructor(private http: HttpClient) 
  { }

  Login( formData )
  {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    //header = header.append('Access-Control-Allow-Origin', '*');
    //header = header.append('Content-Length', 'calculated when request is sent');
    //header = header.append('Host', 'calculated when request is sent');
    return this.http.post(this.url, formData);
  }
}
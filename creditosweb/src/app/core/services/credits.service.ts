import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErroresService } from './errores.service';
import { Credits } from '../interfaces/credit.interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CreditsService {
  private readonly baseUrl: string = enviroments.baseUrl;
  constructor(private readonly http: HttpClient
    , private readonly erroresService: ErroresService
    , private readonly authService: AuthService
  ) { }
  headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Access-Control-Allow-Headers': 'Content-Type',
    "Authorization": 'Bearer ' + this.authService.getToken(),
  }
  httpOptions = {
    headers: new HttpHeaders(this.headers)
  };

  getCredits(): Observable<Credits[]> {
    return this.http.get<Credits[]>(`${this.baseUrl}/credits`, this.httpOptions);
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/credits/count`, this.httpOptions);
  }
}

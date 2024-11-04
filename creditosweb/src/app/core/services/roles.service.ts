import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErroresService } from './errores.service';
import { Rol } from '../interfaces/rol.interface';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
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

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.baseUrl}/roles`, this.httpOptions);
  }
}

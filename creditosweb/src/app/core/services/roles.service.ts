import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErroresService } from './errores.service';
import { Rol } from '../interfaces/role.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private readonly baseUrl: string = enviroments.baseUrl;
  constructor(private readonly http: HttpClient, private readonly erroresService: ErroresService) { }
  headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
   // 'Access-Control-Allow-Headers': 'Content-Type',
    "Authorization": 'Bearer '+window.sessionStorage.getItem('token'),
  }
  httpOptions = {
    headers: new HttpHeaders(this.headers)
  };

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.baseUrl}/roles`, this.httpOptions);
  }
}

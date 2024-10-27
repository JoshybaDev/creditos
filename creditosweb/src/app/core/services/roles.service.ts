import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErroresService } from './errores.service';
import { Rol } from '../interfaces/roles.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private readonly baseUrl: string = enviroments.baseUrl;
  constructor(private readonly http: HttpClient, private readonly erroresService: ErroresService) { }

  httpOptions = {
    headers: new HttpHeaders({ "Authorization": `Bearer ${sessionStorage.getItem('token')}` })
  };

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.baseUrl}/roles`);
  }
}

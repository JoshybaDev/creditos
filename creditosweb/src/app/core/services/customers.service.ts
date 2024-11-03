import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ErroresService } from './errores.service';
import { Customer } from '@interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
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

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/customers`, this.httpOptions);
  }
}

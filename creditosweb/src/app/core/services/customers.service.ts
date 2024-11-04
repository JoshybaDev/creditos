import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments/environments';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { ErroresService } from './errores.service';
import { Customer } from '@interfaces/customer.interface';
import { Response } from '@interfaces/response.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private readonly baseUrl: string = enviroments.baseUrl;
  constructor(private readonly http: HttpClient
    , private readonly erroresService: ErroresService
    , private readonly authService: AuthService) { }
  headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "Authorization": 'Bearer ' + this.authService.getToken(),
  }
  httpOptions = {
    headers: new HttpHeaders(this.headers)
  };

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/customers`, this.httpOptions);
  }

  setCustomerSave(customer: Customer): Observable<Response> {
    return this.http.post<any>(`${this.baseUrl}/customers`, customer, this.httpOptions)
      .pipe(map(data => data),
        catchError(this.erroresService._handleError)
      );
  }

  setUserUpdateData(customer: Customer) {
    return this.http.put<Response>(`${this.baseUrl}/customers/${customer.id}`, customer, this.httpOptions)
      .pipe(map(data => data),
        catchError(this.erroresService._handleError)
      );
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/customers/count`, this.httpOptions);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/customers/${id}`, this.httpOptions);
  }
}

import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of } from "rxjs";
import { Injectable } from "@angular/core";
import { ErroresService } from "./errores.service";
import { Router } from '@angular/router';

import { enviroments } from "@enviroments/environments";
import { LoginResponse, LoginRequest } from "@interfaces/login.interface";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly baseUrl: string = enviroments.baseUrl;
    constructor(private readonly http: HttpClient, private readonly erroresService: ErroresService, private router: Router) { }

    setLogin(login: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, login)
            .pipe(map(data => data),
                catchError(this.erroresService._handleError)
            );
    }
    createSession(resposeData) {
        if (resposeData.code == 200) {
            sessionStorage.clear();
            sessionStorage.setItem('token', resposeData.accessToken);
            sessionStorage.setItem('name', resposeData.name);
            sessionStorage.setItem('roles', JSON.stringify(resposeData.roles));
            sessionStorage.setItem('iperfil', resposeData.iperfil);
            this.router.navigate([resposeData.redirect]);
          }
    }
    logout(): void {
        //sessionStorage.removeItem('name');
        sessionStorage.clear();
        this.router.navigate(['/']);
    }

    isLoggedIn(): boolean {
        return sessionStorage.getItem('name') !== null
    }

    getToken(){
        return sessionStorage.getItem('token')
    }

    getName(){
        return sessionStorage.getItem('name')
    }    

    getRoles(){
        return sessionStorage.getItem('roles')
    }  
    
    getIPerfil(){
        return sessionStorage.getItem('iperfil')
    }  

    getEsAdmin(){
        let xEsAdmin = false;
        let roles = JSON.parse(sessionStorage.getItem('roles'));
        roles.forEach(element => {
          if(element.name=='ADMIN'){
            xEsAdmin=true;
          }
        });
        return xEsAdmin;
      }       
}
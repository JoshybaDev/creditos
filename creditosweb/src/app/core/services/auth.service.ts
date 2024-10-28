import { HttpClient } from "@angular/common/http";
import { enviroments } from "../../enviroments/environments";
import { Observable, catchError, map, of } from "rxjs";
import { Injectable } from "@angular/core";
import { ErroresService } from "./errores.service";
import { LoginResponse, LoginRequest } from "../interfaces/login.interface";

@Injectable({providedIn:'root'})
export class AuthService{
    private readonly baseUrl:string = enviroments.baseUrl;
    constructor(private readonly http:HttpClient, private readonly erroresService: ErroresService){}

    setLogin(login: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, login)
            .pipe(map(data => data),
                catchError(this.erroresService._handleError)
            );
    }
}
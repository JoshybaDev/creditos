import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, map } from "rxjs";
import { Injectable } from "@angular/core";

import { enviroments } from "../../enviroments/environments";
import { ErroresService } from "./errores.service";
import { Response } from "@interfaces/response.interface";
import { User } from "../interfaces/user.interface";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class UsersService {

    private readonly baseUrl: string = enviroments.baseUrl;
    token:string = ""
    constructor(private readonly http: HttpClient
        , private readonly erroresService: ErroresService
        , private readonly authService: AuthService
    ) {
    }
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        //'Access-Control-Allow-Headers': 'Content-Type',
        "Authorization": 'Bearer '+this.authService.getToken(),
    }
    httpOptions = {
        headers: new HttpHeaders(this.headers)
    };

    getCount(): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/users/count`, this.httpOptions);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/users`, this.httpOptions);
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/users/${id}`, this.httpOptions);
    }

    setUsersSave(user: User): Observable<Response> {
        return this.http.post<Response>(`${this.baseUrl}/users`, user, this.httpOptions)
            .pipe(map(data => data),
                catchError(this.erroresService._handleError)
            );
    }

    setUserUpdateData(user: User) {
        return this.http.put<Response>(`${this.baseUrl}/users/${user.id}`, user, this.httpOptions)
            .pipe(map(data => data),
                catchError(this.erroresService._handleError)
            );
    }

    setUserUpdatePhoto(user: User) {
        return this.http.put<Response>(`${this.baseUrl}/users/photo/${user.id}`, user, this.httpOptions)
            .pipe(map(data => data),
                catchError(this.erroresService._handleError)
            );
    }

    setUserUpdatePassword(user: User) {
        return this.http.put<Response>(`${this.baseUrl}/users/pass/${user.id}`, user, this.httpOptions)
            .pipe(map(data => data),
                catchError(this.erroresService._handleError)
            );
    }

    setUserDeleteById(id: number): Observable<Response> {
        return this.http.delete<Response>(`${this.baseUrl}/users/${id}`, this.httpOptions);
    }
}
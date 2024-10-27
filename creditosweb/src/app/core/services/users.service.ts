import { HttpClient, HttpHeaders } from "@angular/common/http";
import { enviroments } from "../../enviroments/environments";
import { Observable, catchError, of, map } from "rxjs";
import { User, UserResponse } from "../interfaces/users.interface";
import { Injectable } from "@angular/core";
import { ErroresService } from "./errores.service";

@Injectable({ providedIn: 'root' })
export class UsersService {

    private readonly baseUrl: string = enviroments.baseUrl;
    constructor(private readonly http: HttpClient, private erroresService: ErroresService) {
    }

    httpOptions = {
        headers : new HttpHeaders({"Authorization":  `Bearer ${sessionStorage.getItem('token')}`})
      };

    getCount(): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/users/count`,this.httpOptions);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/users`,this.httpOptions);
    }

    getUserById(id:number): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/users/${id}`,this.httpOptions);
    }

    setUsersSave(user: User): Observable<UserResponse> {
        return this.http.post<UserResponse>(`${this.baseUrl}/users`, user,this.httpOptions)
            .pipe(map(data => data),
                catchError(this.erroresService._handleError)
            );
    }

    setUserUpdateData(user: User){
        return this.http.put<UserResponse>(`${this.baseUrl}/users/${user.id}`, user,this.httpOptions)
            .pipe(map(data => data),
                catchError(this.erroresService._handleError)
            );
    }

    setUserUpdatePhoto(user: User){
        return this.http.put<UserResponse>(`${this.baseUrl}/users/photo/${user.id}`, user,this.httpOptions)
            .pipe(map(data => data),
                catchError(this.erroresService._handleError)
            );
    }

    setUserUpdatePassword(user: User){
        return this.http.put<UserResponse>(`${this.baseUrl}/users/pass/${user.id}`, user,this.httpOptions)
            .pipe(map(data => data),
                catchError(this.erroresService._handleError)
            );
    }

    setUserDeleteById(id:number): Observable<UserResponse> {
        return this.http.delete<UserResponse>(`${this.baseUrl}/users/${id}`,this.httpOptions);
    }
}
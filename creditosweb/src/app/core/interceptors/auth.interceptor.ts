import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  console.log("authInterceptor======>", req);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('ResponseInterceptor===========>', error);
      //console.log('ResponseInterceptor.status===========>', error.status);
      if (error.status == 403) {
        authService.logout();
      }
      return throwError(() => error);
    })
  )
};





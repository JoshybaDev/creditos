import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("authInterceptor======>", req);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      //console.log('ResponseInterceptor===========>', error);
      //console.log('ResponseInterceptor.status===========>', error.status);
      if(error.status==403){

      }
      return throwError(() => error);
    })
  );
};





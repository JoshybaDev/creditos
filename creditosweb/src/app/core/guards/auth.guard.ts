import { HttpClient, HttpHandler } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';



export const AuthGuard: CanActivateFn = (route, state) => {
  //let authService: AuthService;
  //let router: Router;
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log("routes=====>", route);
  console.log("state======>", state);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};



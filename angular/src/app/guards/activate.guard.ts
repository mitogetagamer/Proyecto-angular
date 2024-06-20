import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from '../services/login.service.service';
import { inject } from '@angular/core';

export const activateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginservice = inject(LoginServiceService);
  if (loginservice.isLogin()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

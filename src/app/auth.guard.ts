import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
const userService = inject(UserService);

if (userService.isAuthenticated()) {
  return true;
  }
  else {
  router.navigate(['/login']);
  return false;
  }
};

import {CanActivateFn} from '@angular/router';

export const orderDetailGuard: CanActivateFn = (route, state) => {
  return true;
};

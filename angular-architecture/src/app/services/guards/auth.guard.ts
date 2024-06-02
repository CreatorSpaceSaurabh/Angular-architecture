// export const authGuard: CanActivateFn = (route, state) => {
//     return true;
// };

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CommonService } from '../common/common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private commonService: CommonService, private router: Router) {}
  // private toastr : ToastrService
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.commonService.isLoggedIn()) {
      return true;
    } else {
      // this.toastr.warning('Should login first to access path')
      return this.router.navigate(['/']);
    }
  }
}

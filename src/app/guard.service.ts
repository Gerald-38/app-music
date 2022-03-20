// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class GuardService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
  })
  // export class GuardService implements CanActivate {
  //   constructor(private aS: AuthService, private router: Router) { }
    
  //   canActivate(
  //     route: ActivatedRouteSnapshot,
  //     state: RouterStateSnapshot): any | boolean {
      
  //     // TODO ...
  //     return false;
  //   }
  // }

export class GuardService implements CanActivate {
  constructor(private aS: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any | boolean {
    if (this.aS.authenticated())
      {
        console.log('login...');
        return true;
      }
      if (this.aS.authenticated() == false) {
        console.log('no login...');
        this.router.navigate(['/login'], {
          queryParams: { messageError: 'Error authentification' }
        });
    }  
  }

}
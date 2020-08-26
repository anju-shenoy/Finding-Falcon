import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private router: Router,
    private _appService: AppService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this._appService.getResult().status) {
          return true;
      }

      this.router.navigate(['']);
      return false;
  }
}

import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {DataService} from './model/data.service';

@Injectable()
export class RouteCanActivate implements CanActivate {
  constructor(private router: Router, private data: DataService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.data.getToken(), route.url)
    if (!this.data.getToken()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

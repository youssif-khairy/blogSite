import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromRoot from '../app.reducer'
import { Store } from '@ngrx/store';
import { take, map } from "rxjs/operators";
import { of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<fromRoot.State>, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        
        return this.store.select(fromRoot.isAuthenticated).pipe(take(1), map(value => {
            if (!value)
                this.router.navigate(['/'])
            return value
        }))
    }

}
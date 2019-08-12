import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private store: Store<fromApp.AppState>) { }

    canActivate(route: ActivatedRouteSnapshot,
                router: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(state => state.user),
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return isAuth;
                }
                return this.router.createUrlTree(['/login']);
            })
        );
    }

}

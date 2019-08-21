import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
import { AuthState } from './store/auth.state';
import { User } from '../shared/model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    @Select(AuthState.user) private user$: Observable<User>;

    constructor(private router: Router,
                private store: Store) { }

    canActivate(route: ActivatedRouteSnapshot,
                router: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.user$.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return isAuth;
                }
                return this.router.createUrlTree(['/auth/login']);
            })
        );
    }

}

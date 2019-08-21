import { Component, ViewChild, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AlertComponent } from 'src/app/shared/component/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/directive/placeholder.directive';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import { Store, Select } from '@ngxs/store';
import { AuthState } from '../store/auth.state';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];
    @Select(AuthState.loading) private loading$: Observable<boolean>;
    @Select(AuthState.error) private error$: Observable<any>;
    @ViewChild(PlaceholderDirective, {static: false}) alertContainer: PlaceholderDirective;

    constructor(private store: Store,
                private componentFactoryResolver: ComponentFactoryResolver,
                private router: Router) { }

    ngOnInit() {
        this.subscriptions.push(
            this.error$.subscribe(
                error => {
                    if (!!error) {
                        this.showErrorAlert(error);
                    }
                }
            )
        );
    }

    login(form: NgForm) {
        this.store.dispatch(new AuthActions.Login({username: form.value.username, password: form.value.password}));
        form.reset();
    }

    navigateSignup() {
        this.store.dispatch(new AuthActions.ClearError());
        this.router.navigate(['auth', 'signup']);
    }

    private showErrorAlert(message: string) {
        const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const component = this.alertContainer.viewContainerRef.createComponent(alertFactory);
        component.instance.message = message;
        component.instance.closeSub = component.instance.closeAlert.subscribe(
            () => {
                component.instance.closeSub.unsubscribe();
                component.destroy();
            }
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}

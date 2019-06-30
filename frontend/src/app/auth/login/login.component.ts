import { Component, ViewChild, OnInit, OnDestroy, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    errorSub: Subscription;
    alertFactory: ComponentFactory<AlertComponent>;
    @ViewChild(PlaceholderDirective, {static: false}) alertContainer: PlaceholderDirective;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        this.errorSub = this.authService.error.subscribe(
            error => {
                this.showErrorAlert(error.message);
            }
        );
    }

    ngOnDestroy() {
        this.errorSub.unsubscribe();
    }

    login(form: NgForm) {
        this.authService.login(form.value);
    }

    navigateSignup() {
        this.router.navigate(['signup']);
    }

    private showErrorAlert(message: string) {
        const alertViewContainerRef = this.alertContainer.viewContainerRef;
        const component = alertViewContainerRef.createComponent(this.alertFactory);
        component.instance.message = message;
        component.instance.closeSub = component.instance.closeAlert.subscribe(
            () => {
                component.instance.closeSub.unsubscribe();
                component.destroy();
            }
        );
    }

}

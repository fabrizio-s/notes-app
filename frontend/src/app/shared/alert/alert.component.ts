import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

    @Input() public message: string;
    @Output() public closeAlert = new EventEmitter<void>();
    public closeSub: Subscription;

    onClose() {
        this.closeAlert.emit();
    }

}

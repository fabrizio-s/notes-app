import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

    @Input() message: string;
    @Output() closeAlert = new EventEmitter<void>();
    closeSub: Subscription;

    onClose() {
        this.closeAlert.emit();
    }

}

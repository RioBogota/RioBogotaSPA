import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class Base implements OnDestroy {
    subscriptions: Subscription[];
    ngOnDestroy(): void {
        if (!this.subscriptions || !this.subscriptions.length) {
            return;
        }
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
    constructor() {
        this.subscriptions = [];
    }

    unsubscribeOndestroy(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }
}
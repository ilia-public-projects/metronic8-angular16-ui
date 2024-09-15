import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../../modules/authentication/auth.service';
import { Subscription, firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    public isAdmin = false;

    constructor(
        private auth: AuthService,

    ) { }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sb => sb.unsubscribe());
    }

    async ngOnInit() {
        this.subscriptions.push(this.auth.user$.subscribe(user => {
            if (user && user.roles.some(x => x === 'Admin')) {
                this.isAdmin = true;
            }
        }));
    }

}

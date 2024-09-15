import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { AuthService } from '../../../../../modules/authentication/auth.service';
import { UserModel } from '../../../../../modules/authentication/models/user-model';
import { SignalRService } from '../../../../../shared/services/signalR.service';
import { ActiveConnectionModel } from '../../../../partials/layout/extras/dropdown-inner/models/active-connection.model';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    @Input() appHeaderDefaulMenuDisplay: boolean;
    @Input() isRtl: boolean;

    itemClass: string = 'ms-1 ms-lg-3';
    btnClass: string = 'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
    userAvatarClass: string = 'symbol-35px symbol-md-40px';

    btnIconClass: string = 'fs-2 fs-md-1';

    public user$: Observable<UserModel | null>;
    public connectedUsers: ActiveConnectionModel[] = [];

    private unsubscribe: Subscription[] = [];


    constructor(
        private auth: AuthService,
        private signalRService: SignalRService,
        private cd: ChangeDetectorRef
    ) { }

    async ngOnInit() {
        this.user$ = this.auth.user$.pipe(tap(x => this.cd.detectChanges()));

        this.unsubscribe.push(this.signalRService.activeConnectionsUpdated.subscribe((connections: ActiveConnectionModel[]) => {
            this.connectedUsers = connections;
            this.cd.detectChanges();
        }));
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}

import { ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { SignalRService } from "../../../../../../shared/services/signalR.service";
import { ActiveConnectionModel } from "../models/active-connection.model";
@Component({
    selector: "app-connected-users-inner",
    templateUrl: "./connected-users-inner.component.html",
})
export class ConnectedUsersInnerComponent implements OnInit, OnDestroy {
    @HostBinding('class') class =
        'menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px';
    @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
    
    private subscriptions: Subscription[] = [];

    public activeConnections: ActiveConnectionModel[] = [];

    constructor(
        private signalRService: SignalRService,
        private cd: ChangeDetectorRef
    ) { }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngOnInit(): void {
        this.subscriptions.push(this.signalRService.activeConnectionsUpdated.subscribe(connections => {
            this.activeConnections = connections;
            this.cd.detectChanges();
        }));
    }
}
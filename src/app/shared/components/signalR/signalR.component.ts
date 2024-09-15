import { Component, OnDestroy, OnInit } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { HubConnection } from "@microsoft/signalr";
import { Subscription } from "rxjs";
import { environment } from "../../../../environments/environment";
import { ActiveConnectionModel } from "../../../_metronic/partials/layout/extras/dropdown-inner/models/active-connection.model";
import { AuthService } from "../../../modules/authentication/auth.service";
import { UserModel } from "../../../modules/authentication/models/user-model";
import { SignalRService } from "../../services/signalR.service";

@Component({
    selector: 'app-signalR',
    template: ''
})
export class SignalRComponent implements OnInit, OnDestroy {
    private hubConnection: HubConnection;
    private subscriptions: Subscription[] = [];

    constructor(
        private authService: AuthService,
        private signalRService: SignalRService
    ) { }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());

        if (this.hubConnection) {
            this.hubConnection.stop();
        }
    }

    async ngOnInit() {
        this.subscriptions.push(this.authService.user$.subscribe(user => {
            if (user) {
                this.initiateHubConnection(user);
            }
        }));
    }

    private initiateHubConnection(user: UserModel) {
        if (!this.hubConnection) {
            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(`${environment.apiUrl}/connectionhub?userId=${user.userId}&name=${user.name}&email=${user.email}&photoUri=${user.photoUri}`)
                .withAutomaticReconnect()
                .build();

            this.hubConnection.start().then(() => {
                this.hubConnection.invoke("ShowActiveConnections");
            }).catch(err => console.error(err.toString()));

            this.hubConnection.on('showActiveUsers', (data: any[]) => {
                const connections: ActiveConnectionModel[] = [];
                data.forEach((item) => {
                    const photoUri = item.photoUri ? item.photoUri : '/assets/media/avatars/blank.png';
                    connections.push(new ActiveConnectionModel(item.name, item.email, photoUri));  // exception to capitalization
                });
                this.signalRService.notifyActiveConnectionsUpdated(connections);
            });
        }

    }
}
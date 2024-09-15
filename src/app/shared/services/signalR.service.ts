import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ActiveConnectionModel } from "../../_metronic/partials/layout/extras/dropdown-inner/models/active-connection.model";

@Injectable({ providedIn: 'root' })
export class SignalRService {
    private activeConnections = new BehaviorSubject<ActiveConnectionModel[]>([]);
    public activeConnectionsUpdated = this.activeConnections.asObservable();

    public notifyActiveConnectionsUpdated(connections: ActiveConnectionModel[]) {
        this.activeConnections.next(connections);
    }
}
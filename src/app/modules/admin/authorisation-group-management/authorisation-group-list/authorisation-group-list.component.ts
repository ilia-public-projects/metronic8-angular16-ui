import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../../shared/services/notification.service';
import { PagedResult } from '../../../../shared/shared-api-models/page-result';
import { AuthorisationGroupsApiService } from '../../api-services/auth-group-api/auth-group-api.service';
import { ResponseAuthorisationGroupSearchResult } from '../../api-services/auth-group-api/responses/post-search-authorisation-group-response';
import { Subscription, firstValueFrom } from 'rxjs';
import { AuthorisationGroupCreateDialogComponent } from '../create-auth-group-dialog/create-auth-group-dialog.component';
import { MenuComponent } from '../../../../_metronic/kt/components/MenuComponent';
import { EditAuthGroupDialogComponent } from '../edit-auth-group-dialog/edit-auth-group-dialog.component';
import { AuthorisationGroupsPermissionsComponent } from '../change-auth-group-permissions-dialog/authorisation-groups-permissions.component';

@Component({
    selector: 'app-authorisation-group-list',
    templateUrl: 'authorisation-group-list.component.html'
})

export class AuthorisationGroupListComponent implements OnInit, OnDestroy {
    public isSearching = false;
    public searchResult?: PagedResult<ResponseAuthorisationGroupSearchResult>;

    private subscriptions: Subscription[] = [];

    constructor(
        private authGroupService: AuthorisationGroupsApiService,
        private modalService: BsModalService,
        private notificationService: NotificationService,
        private cd: ChangeDetectorRef
    ) { }

    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    async ngOnInit() {
        await this.search();
    }

    public async search() {
        this.isSearching = false;
        try {
            const response = await firstValueFrom(this.authGroupService.search());
            this.searchResult = response.response.data;

            // reinitialize dropdown menu in table, because it is not working after search
            setTimeout(() => {
                MenuComponent.reinitialization()
            });
        }
        catch (error) {
            this.notificationService.apiError(error);
        }
        finally {
            this.isSearching = false;
            this.cd.detectChanges();
        }

    }

    public create() {
        const modal = this.modalService.show(AuthorisationGroupCreateDialogComponent);
        this.subscriptions.push(modal!.content!.onSuccess.subscribe(() => {
            this.search();
        }));
    }

    public edit(item: ResponseAuthorisationGroupSearchResult) {
        const modal = this.modalService.show(EditAuthGroupDialogComponent, { class: 'modal-dialog-centered mw-650px', initialState: { id: item.id } });
        this.subscriptions.push(modal!.content!.onSuccess.subscribe(() => {
            this.search();
        }));
    }

    public changePermissions(item: ResponseAuthorisationGroupSearchResult) {
        this.modalService.show(AuthorisationGroupsPermissionsComponent, { class: 'modal-dialog-centered mw-650px', initialState: { id: item.id } });
    }
}

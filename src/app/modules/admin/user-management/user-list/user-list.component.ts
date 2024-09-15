import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { Subscription, firstValueFrom } from "rxjs";
import { MenuComponent } from "../../../../_metronic/kt/components";
import { PagedResult } from "../../../../shared/shared-api-models/page-result";
import { RequestUserSearchCriteria } from "../../api-services/user-api/models/request-user-search-criteria";
import { UserSearchResponseResult } from "../../api-services/user-api/models/response-user-search-result";
import { PostSearchUserRequest } from "../../api-services/user-api/requests/post-search-user-request";
import { UserApiService } from "../../api-services/user-api/user-api.service";
import { UserCreateDialogComponent } from "../create-user-dialog/create-user-dialog.component";
import { UserEditDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { AssignUserGroupComponent } from "../assign-user-group-dialog/assign-user-group-dialog.component";
import { ChangePasswordDialogComponent } from "../../../../shared/components/change-password-dialog/change-password-dialog.component";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default

})
export class UserListComponent implements OnInit, OnDestroy {
    public isSearching = false;
    public criteriaSet = false;

    public searchResult?: PagedResult<UserSearchResponseResult>;
    public searchCriteria = new RequestUserSearchCriteria();

    private subscriptions: Subscription[] = [];

    constructor(
        private apiService: UserApiService,
        private cd: ChangeDetectorRef,
        private modalService: BsModalService
    ) { }

    ngOnInit() {
        this.initializeCriteria();
        this.search();
    }

    ngOnDestroy() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public initializeCriteria() {
        this.searchCriteria = new RequestUserSearchCriteria();
    }

    public async search(page: number = 1) {
        this.isSearching = true;
        this.searchCriteria.page = page;

        try {
            const request = new PostSearchUserRequest(this.searchCriteria);
            const response = await firstValueFrom(this.apiService.search(request));
            this.searchResult = response!.response.data;

            // reinitialize dropdown menu in table, because it is not working after search
            setTimeout(() => {
                MenuComponent.reinitialization()
            });
        }
        finally {
            this.isSearching = false;
            this.cd.detectChanges();
        }
    }

    public onPageChanged(event: any) {
        this.search(event.page);
    }

    public create() {
        const modal = this.modalService.show(UserCreateDialogComponent, { class: 'modal-dialog-centered mw-650px' });
        this.subscriptions.push(modal!.content!.onSuccess.subscribe(() => {
            this.search();
        }));
    }

    public edit(user: UserSearchResponseResult) {
        const modal = this.modalService.show(UserEditDialogComponent, { class: 'modal-dialog-centered mw-650px', initialState: { id: user.id } });
        this.subscriptions.push(modal!.content!.onSuccess.subscribe(() => {
            this.search();
        }));
    }

    public assignGroups(user: UserSearchResponseResult) {
        const modal = this.modalService.show(AssignUserGroupComponent, { class: 'modal-dialog-centered mw-650px', initialState: { id: user.id } });
    }

    public changePassword(user: UserSearchResponseResult) {
        const modal = this.modalService.show(ChangePasswordDialogComponent, { class: 'modal-dialog-centered mw-650px', initialState: { id: user.id } });
    }
}

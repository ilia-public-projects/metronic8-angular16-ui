import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { firstValueFrom } from 'rxjs';
import { UserAuthorisationGroupModel, UserAuthorisationGroupsViewModel } from './models/user-authorisation-groups-view.model';
import { NotificationService } from '../../../../shared/services/notification.service';
import { PutUpdateUserAuthorisationGroupsRequest } from '../../api-services/user-api/requests/put-update-user-authorisation-groups-request';
import { UserApiService } from '../../api-services/user-api/user-api.service';

@Component({
    selector: 'app-assign-user-group-dialogs',
    templateUrl: './assign-user-group-dialog.component.html'
})

export class AssignUserGroupComponent implements OnInit {
    @Input() id: string;
    
    public isLoading = false;
    public isSaving = false;
    public errors:string[];
    public viewModel: UserAuthorisationGroupsViewModel;

    constructor(
        private userService: UserApiService,
        private modalRef: BsModalRef,
        private notificationService: NotificationService,
    ) { }

    
    async ngOnInit() {
        this.isLoading = true;
        try {
            const response = await firstValueFrom(this.userService.getUserAuthorisationGroups(this.id));
            const result = response.response.data;
            this.viewModel = new UserAuthorisationGroupsViewModel(result.name, []);
            result.groups.forEach((group) => {
                this.viewModel.groups.push(new UserAuthorisationGroupModel(group.groupId, group.groupName, group.isSelected));
            });
        }
        catch (error) {
            this.notificationService.apiError(error);
            this.closeModal();
        }
        finally {
            this.isLoading = false;
        }
    }

    public async save() {
        if(this.isSaving){
            return;
        }

        this.errors = [];
        this.isSaving = true;
        const request = new PutUpdateUserAuthorisationGroupsRequest(this.viewModel.groups.filter(x => x.isSelected).map(x => x.groupId));
        try {
            await firstValueFrom(this.userService.updateUserAuthorisationGroups(this.id, request));
            this.closeModal();
            this.notificationService.success('Changes saved successfully');
        }
        catch (error) {
            this.errors = this.notificationService.apiError(error);
        }
        finally {
            this.isSaving = false;
        }
    }

    public closeModal() {
        this.modalRef.hide();
    }
}

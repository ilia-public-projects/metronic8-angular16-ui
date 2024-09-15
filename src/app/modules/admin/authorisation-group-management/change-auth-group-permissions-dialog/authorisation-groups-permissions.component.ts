import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthorisationGroupRoleSelectionModel } from './models/authorisation-group-role-selection.model';
import { NotificationService } from '../../../../shared/services/notification.service';
import { AuthorisationGroupsApiService } from '../../api-services/auth-group-api/auth-group-api.service';
import { PutUpdateAuthorisationGroupPermissions } from '../../api-services/auth-group-api/requests/put-update-authorisation-group-permissions';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-auth-groups-permissions',
    templateUrl: 'authorisation-groups-permissions.component.html'
})
export class AuthorisationGroupsPermissionsComponent implements OnInit {
    @Input() id: string;
    @Output() onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

    public form: FormGroup;
    public isLoading = false;
    public isSaving = false;
    public errors: string[] = [];
    public groupName: string;
    public roles: AuthorisationGroupRoleSelectionModel[];

    constructor(
        private authGroupService: AuthorisationGroupsApiService,
        private modalRef: BsModalRef,
        private notificationService: NotificationService) { }

    async ngOnInit() {
        this.isLoading = true;
        try {
            const response = await firstValueFrom(this.authGroupService.getPermissions(this.id));
            this.groupName = response.response.data.name;

            this.roles = response.response.data.roles;

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
        if (this.isSaving) {
            return;
        }
        this.isSaving = true;
        this.errors = [];

        const request = new PutUpdateAuthorisationGroupPermissions(this.getSelectedRoleIds(this.roles));
        try {
            await firstValueFrom(this.authGroupService.updatePermissions(this.id, request));
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

    private getSelectedRoleIds(roles: AuthorisationGroupRoleSelectionModel[]) {
        let result: string[] = [];
        if (roles && roles.length) {
            roles.forEach((role) => {
                if (role.selected) {
                    result.push(role.id);
                }

                result = result.concat(this.getSelectedRoleIds(role.children));
            });
        }
        return result;
    }

    public closeModal() {
        this.modalRef.hide();
    }
}

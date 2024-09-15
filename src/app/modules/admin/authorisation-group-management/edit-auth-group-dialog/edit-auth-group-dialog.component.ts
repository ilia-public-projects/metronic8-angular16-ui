import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription, firstValueFrom } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import { UserIdentifier } from '../../api-services/user-api/models/response-user-identifier';
import { PutUpdateUserRequest } from '../../api-services/user-api/requests/put-update-user-request';
import { UserApiService } from '../../api-services/user-api/user-api.service';
import { AuthorisationGroupsApiService } from '../../api-services/auth-group-api/auth-group-api.service';
import { ResponseAuthorisationGroupModel } from '../../api-services/auth-group-api/responses/get-authorisation-group-response';
import { PutEditAuthorisationGroupRequest } from '../../api-services/auth-group-api/requests/put-edit-authorisation-group-request';
@Component({
    selector: 'app-edit-auth-group-dialog',
    templateUrl: './edit-auth-group-dialog.component.html'
})
export class EditAuthGroupDialogComponent implements OnInit, OnDestroy {
    @Input() public id: string;
    @Output() onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    public errors: string[];
    public form: FormGroup;
    private subs: Subscription[] = [];

    public isLoading = false;
    public isSaving = false;

    constructor(
        private apiService: AuthorisationGroupsApiService,
        private modal: BsModalRef,
        private notificationService: NotificationService
    ) { }

    ngOnDestroy(): void {
        this.subs.forEach(x => x.unsubscribe());
    }

    async ngOnInit() {
        this.loadUser();
    }

    private async loadUser() {
        this.isLoading = true;
        try {
            const result = await firstValueFrom(this.apiService.getById(this.id));
            await this.initializeForm(result.response.data);
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

        if (this.form.invalid) {
            this.notificationService.error('Please fix form errors');
            this.form.markAllAsTouched();
            return;
        }

        this.isSaving = true;
        const request = new PutEditAuthorisationGroupRequest(this.name!.value);

        try {
            await firstValueFrom(this.apiService.edit(this.id, request));
            this.notificationService.success('Authorisation group saved!');
            this.onSuccess.emit(true);
            this.closeModal();
        }
        catch (error) {
            this.errors = this.notificationService.apiError(error);
        }
        finally {
            this.isSaving = false;
        }
    }

    private async initializeForm(data: ResponseAuthorisationGroupModel) {
        this.form = new FormGroup({
            name: new FormControl(data.name, Validators.required),
        });
    }

    public closeModal(){
        this.modal.hide();
    }

    get name() {
        return this.form.get('name');
    }
}

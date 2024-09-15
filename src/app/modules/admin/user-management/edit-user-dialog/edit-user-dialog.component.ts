import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription, firstValueFrom } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import { UserIdentifier } from '../../api-services/user-api/models/response-user-identifier';
import { PutUpdateUserRequest } from '../../api-services/user-api/requests/put-update-user-request';
import { UserApiService } from '../../api-services/user-api/user-api.service';
import { PutChangeUserPhotoRequest } from '../../api-services/user-api/requests/put-change-user-photo-request';
import { HttpEventType } from '@angular/common/http';
import { ApiResult } from '../../../../shared/shared-api-models/api-result';
@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html'
})
export class UserEditDialogComponent implements OnInit, OnDestroy {
    @Input() public id: string;
    @Output() onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

    public errors: string[];
    public form: FormGroup;
    private subs: Subscription[] = [];

    public isLoading = false;
    public isSaving = false;

    public photoUri: string;
    public isSavingPhoto = false;

    constructor(
        private userService: UserApiService,
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
            const result = await firstValueFrom(this.userService.getById(this.id));
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
        const request = new PutUpdateUserRequest(this.email!.value, this.name!.value, this.isActive!.value);

        try {
            await firstValueFrom(this.userService.edit(this.id, request));
            this.notificationService.success('User saved!');
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

    private async initializeForm(data: UserIdentifier) {
        this.form = new FormGroup({
            name: new FormControl(data.name, Validators.required),
            email: new FormControl(data.email, [Validators.email, Validators.required]),
            isActive: new FormControl(data.isActive, Validators.required),
        });

        this.photoUri = data.photoUriRaw;
    }

    public async uploadPhoto(file?: File) {
        if(this.isSavingPhoto){
            return;
        }

        this.isSavingPhoto = true;
        this.errors = [];

        const request = new PutChangeUserPhotoRequest(file);
        this.userService.updateProfilePhoto(request,this.id).subscribe(async (event) => {
            if (event.type === HttpEventType.Response) {
                const response = event.body as ApiResult<any>;
                if (response.errorMessages && response.errorMessages.length) {
                    this.errors = this.notificationService.apiError(response);
                } else {
                    this.onSuccess.emit(true);
                    this.notificationService.success('Profile photo updated');
                    
                }

                this.isSavingPhoto = false;
            }
        }, (error) => {
            this.errors = this.notificationService.apiError(error);
            this.isSavingPhoto = false;
        });
    }

    public closeModal() {
        this.modal.hide();
    }

    get name() {
        return this.form.get('name');
    }

    get email() {
        return this.form.get('email');
    }

    get isActive() {
        return this.form.get('isActive');
    }
}

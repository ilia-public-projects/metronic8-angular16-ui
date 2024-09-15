import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../../shared/services/notification.service';
import { AuthorisationGroupsApiService } from '../../api-services/auth-group-api/auth-group-api.service';
import { PostNewAuthorisationGroupRequest } from '../../api-services/auth-group-api/requests/post-new-authorisation-group-request';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-create-auth-group-dialog',
    templateUrl: 'create-auth-group-dialog.component.html'
})
export class AuthorisationGroupCreateDialogComponent implements OnInit {

    @Output() onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

    public form: FormGroup;
    public errors: string[] = [];
    public isSaving = false;

    constructor(
        private authGroupService: AuthorisationGroupsApiService,
        public modalRef: BsModalRef,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required)
        });
    }

    public async save() {
        if (this.isSaving) {
            return;
        }

        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isSaving = true;
        this.errors = [];

        const request = new PostNewAuthorisationGroupRequest(this.name!.value);

        try {
            await firstValueFrom(this.authGroupService.create(request));
            
            this.notificationService.success('Authorisation group created successfully');
            this.closeModal();
            this.onSuccess.emit();
        }
        catch (error) {
            this.errors = this.notificationService.apiError(error);
        }
        finally {
            this.isSaving = false;
        }
    }

    public closeModal(){
        this.modalRef.hide();
    }

    get name() {
        return this.form.get('name');
    }
}

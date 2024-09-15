import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../../../modules/admin/api-services/user-api/user-api.service';
import { PutChangePasswordRequest } from '../../../modules/admin/api-services/user-api/requests/put-change-password-request';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../services/notification.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-change-password-diialog',
    templateUrl: 'change-password-dialog.component.html'
})
export class ChangePasswordDialogComponent implements OnInit {

    @Input() id?: string;

    public errors: string[];
    public isSaving = false;
    public form: FormGroup;

    constructor(
        private userService: UserApiService,
        private modalRef: BsModalRef,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            password: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('', [Validators.required])
        });
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

        this.errors = [];
        this.isSaving = false;

        const request = new PutChangePasswordRequest(this.password!.value, this.confirmPassword!.value);

        try {
            await firstValueFrom(this.userService.changePassword(request, this.id));

            this.closeModal();
            this.notificationService.success('Password changed');
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

    get password() {
        return this.form.get('password');
    }

    get confirmPassword() {
        return this.form.get('confirmPassword');
    }

}

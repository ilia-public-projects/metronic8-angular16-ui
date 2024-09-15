import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import { PostNewUserRequest } from '../../api-services/user-api/requests/post-new-user-request';
import { UserApiService } from '../../api-services/user-api/user-api.service';


@Component({
    selector: 'app-create-user-dialog',
    templateUrl: './create-user-dialog.component.html'
})
export class UserCreateDialogComponent implements OnInit {

    @Output() onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

    public isSaving = false;
    public errorMessages: string[];
    public form: FormGroup;

    constructor(
        private userService: UserApiService,
        private modalRef: BsModalRef,
        private toastr: ToastrService,
        private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required),
            employeeId: new FormControl(''),
            employeeDetails: new FormControl('')
        });
    }

    public async save() {
        if(this.isSaving){
            return;
        }

        if (this.form.invalid) {
            this.toastr.error('Please fix form errors');
            this.form.markAllAsTouched();
            return;
        }

        this.errorMessages = [];
        this.isSaving = true;
        try {
            const request = new PostNewUserRequest(this.name!.value, this.email!.value, this.password!.value, this.confirmPassword!.value);
            const response = await firstValueFrom(this.userService.create(request));

            this.closeModal();
            this.onSuccess.emit();
            this.toastr.success('User created!', 'Success!');
        }
        catch (error) {
            this.errorMessages = this.notificationService.apiError(error);
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

    get name() {
        return this.form.get('name');
    }

    get email() {
        return this.form.get('email');
    }
}

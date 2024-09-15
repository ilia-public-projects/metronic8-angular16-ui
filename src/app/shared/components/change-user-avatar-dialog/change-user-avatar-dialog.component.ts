import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../../../modules/authentication/auth.service";
import { BsModalRef } from "ngx-bootstrap/modal";
import { UserApiService } from "../../../modules/admin/api-services/user-api/user-api.service";
import { NotificationService } from "../../services/notification.service";
import { PutChangeUserPhotoRequest } from "../../../modules/admin/api-services/user-api/requests/put-change-user-photo-request";
import { HttpEventType } from "@angular/common/http";
import { ApiResult } from "../../shared-api-models/api-result";
import { FormGroup } from "@angular/forms";
import { PutChangeUserPhotoResponse } from "../../../modules/admin/api-services/user-api/responses/put-change-user-photo-response";

@Component({
    selector: 'app-change-user-avatar-dialog',
    templateUrl: './change-user-avatar-dialog.component.html',
})
export class ChangeUserAvatarDialogComponent implements OnInit, OnDestroy {
    public errors: string[];

    public isLoading = false;
    public photoUri?: string;
    public userId?: string;
    public isSavingPhoto = false;
    public form:FormGroup;

    private subs: Subscription[] = [];

    constructor(
        private userService: UserApiService,
        private modal: BsModalRef,
        private notificationService: NotificationService,
        private authService: AuthService
    ) { }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }

    async ngOnInit() {
        this.form = new FormGroup({});

        this.isLoading = true;
        this.subs.push(this.authService.user.subscribe(async (user) => {
            if (user) {
                this.photoUri = user.photoUri;
            }
            this.isLoading = false;
        }));
    }

    public async uploadPhoto(file?: File) {
        if (this.isSavingPhoto) {
            return;
        }

        this.isSavingPhoto = true;
        this.errors = [];

        const request = new PutChangeUserPhotoRequest(file);
        this.userService.updateProfilePhoto(request).subscribe(async (event) => {
            if (event.type === HttpEventType.Response) {
                const response = event.body as ApiResult<PutChangeUserPhotoResponse>;
                if (response.errorMessages && response.errorMessages.length) {
                    this.errors = this.notificationService.apiError(response);
                } else {
                    this.authService.updateUserPhoto(response.response.photoUri);
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
}
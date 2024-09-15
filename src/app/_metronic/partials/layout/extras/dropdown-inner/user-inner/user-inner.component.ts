import { ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription, tap } from 'rxjs';
import { AuthService } from '../../../../../../modules/authentication/auth.service';
import { UserModel } from '../../../../../../modules/authentication/models/user-model';
import { ChangePasswordDialogComponent } from '../../../../../../shared/components/change-password-dialog/change-password-dialog.component';
import { ChangeUserAvatarDialogComponent } from '../../../../../../shared/components/change-user-avatar-dialog/change-user-avatar-dialog.component';

@Component({
    selector: 'app-user-inner',
    templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
    @HostBinding('class')
    class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
    @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';


    public user$: Observable<UserModel | null>;

    private unsubscribe: Subscription[] = [];

    constructor(
        private auth: AuthService,
        private modalService: BsModalService,
        private cd: ChangeDetectorRef
    ) { }

    async ngOnInit() {
        this.user$ = this.auth.user$.pipe(tap((x) =>
            {
                this.cd.detectChanges()
            }));
    }

    public logout() {
        this.auth.logout();
        document.location.reload();
    }

    public changePassword() {
        const modal = this.modalService.show(ChangePasswordDialogComponent, { class: 'modal-dialog-centered mw-650px' });
    }

    public changeAvatar() {
        this.modalService.show(ChangeUserAvatarDialogComponent);
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}

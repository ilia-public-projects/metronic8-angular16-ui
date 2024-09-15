import { NgModule } from '@angular/core';
import { SharedApplicationModule } from '../../shared/shared-application.module';
import { AdminRoutingModule } from './admin.-routing.module';
import { UserCreateDialogComponent } from './user-management/create-user-dialog/create-user-dialog.component';
import { UserEditDialogComponent } from './user-management/edit-user-dialog/edit-user-dialog.component';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { AssignUserGroupComponent } from './user-management/assign-user-group-dialog/assign-user-group-dialog.component';
import { AuthorisationGroupListComponent } from './authorisation-group-management/authorisation-group-list/authorisation-group-list.component';
import { AuthorisationGroupCreateDialogComponent } from './authorisation-group-management/create-auth-group-dialog/create-auth-group-dialog.component';
import { EditAuthGroupDialogComponent } from './authorisation-group-management/edit-auth-group-dialog/edit-auth-group-dialog.component';
import { AuthorisationGroupsPermissionsComponent } from './authorisation-group-management/change-auth-group-permissions-dialog/authorisation-groups-permissions.component';
import { AuthGroupRoleSelectionComponent } from './authorisation-group-management/change-auth-group-permissions-dialog/auth-group-role-selection.component';

@NgModule({
    declarations: [
        // user management
        UserListComponent,
        UserCreateDialogComponent,
        UserEditDialogComponent,
        AssignUserGroupComponent,

        // auth group management
        AuthorisationGroupListComponent,
        AuthorisationGroupCreateDialogComponent,
        EditAuthGroupDialogComponent,
        AuthorisationGroupsPermissionsComponent,
        AuthGroupRoleSelectionComponent
    ],
    imports: [
        SharedApplicationModule,
        AdminRoutingModule,
    ],
})
export class AdminModule { }

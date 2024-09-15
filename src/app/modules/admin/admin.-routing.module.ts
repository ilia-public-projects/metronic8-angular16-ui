import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-management/user-list/user-list.component';
import { AuthorisationGroupListComponent } from './authorisation-group-management/authorisation-group-list/authorisation-group-list.component';

const routes: Routes = [
    {
        path: 'users',
        component: UserListComponent,
    },
    {
        path: 'users/user-list',
        component: UserListComponent,
    },
    {
        path: 'authorisation-groups',
        component: AuthorisationGroupListComponent,
    },
    {
        path: 'authorisation-groups/authorisation-group-list',
        component: AuthorisationGroupListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }

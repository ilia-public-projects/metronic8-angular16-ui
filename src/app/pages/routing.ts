import { Routes } from '@angular/router';
import { AuthGuard } from '../modules/authentication/auth.guard';

const Routing: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
    {
        path: 'admin',
        loadChildren: () => import('../modules/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [AuthGuard], data: { roles: ['Admin'] }
    },
    {
        path: '**',
        redirectTo: 'error/404',
    },
];

export { Routing };

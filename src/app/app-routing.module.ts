import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/authentication/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./modules/authentication/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'error',
        loadChildren: () => import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./_metronic/layout/layout.module').then((m) => m.LayoutModule),
    },
    { path: '**', redirectTo: 'error/404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

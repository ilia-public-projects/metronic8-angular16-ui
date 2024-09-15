import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { Routing } from '../../pages/routing';
import { SharedApplicationModule } from '../../shared/shared-application.module';
import {
    DrawersModule,
    DropdownMenusModule,
    ModalsModule,
} from '../partials';
import { ExtrasModule } from '../partials/layout/extras/extras.module';
import { ThemeModeModule } from '../partials/layout/theme-mode-switcher/theme-mode.module';
import { SharedModule } from "../shared/shared.module";
import { AsideMenuComponent } from './components/aside/aside-menu/aside-menu.component';
import { AsideComponent } from './components/aside/aside.component';
import { ContentComponent } from './components/content/content.component';
import { HeaderMenuComponent } from './components/header/header-menu/header-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { PageTitleComponent } from './components/header/page-title/page-title.component';
import { ScriptsInitComponent } from './components/scripts-init/scripts-init.component';
import { SidebarFooterComponent } from './components/sidebar/sidebar-footer/sidebar-footer.component';
import { SidebarLogoComponent } from './components/sidebar/sidebar-logo/sidebar-logo.component';
import { SidebarMenuComponent } from './components/sidebar/sidebar-menu/sidebar-menu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AccountingComponent } from './components/toolbar/accounting/accounting.component';
import { ClassicComponent } from './components/toolbar/classic/classic.component';
import { ExtendedComponent } from './components/toolbar/extended/extended.component';
import { ReportsComponent } from './components/toolbar/reports/reports.component';
import { SaasComponent } from './components/toolbar/saas/saas.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: Routing,
    },
];

@NgModule({
    declarations: [
        LayoutComponent,
        AsideComponent,
        HeaderComponent,
        ContentComponent,
        ScriptsInitComponent,
        ToolbarComponent,
        AsideMenuComponent,
        TopbarComponent,
        PageTitleComponent,
        HeaderMenuComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarMenuComponent,
        SidebarFooterComponent,
        NavbarComponent,
        AccountingComponent,
        ClassicComponent,
        ExtendedComponent,
        ReportsComponent,
        SaasComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        InlineSVGModule,
        NgbDropdownModule,
        NgbProgressbarModule,
        ExtrasModule,
        ModalsModule,
        DrawersModule,
        DropdownMenusModule,
        NgbTooltipModule,
        TranslateModule,
        ThemeModeModule,
        SharedModule,
        SharedApplicationModule
    ],
    exports: [RouterModule],
})
export class LayoutModule { }

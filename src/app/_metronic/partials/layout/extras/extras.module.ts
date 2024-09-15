import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedApplicationModule } from '../../../../shared/shared-application.module';
import { SharedModule } from "../../../shared/shared.module";
import { ConnectedUsersInnerComponent } from './dropdown-inner/connected-users-inner/connected-users-inner.component';
import { UserInnerComponent } from './dropdown-inner/user-inner/user-inner.component';
import { LayoutScrollTopComponent } from './scroll-top/scroll-top.component';

@NgModule({
    declarations: [
        UserInnerComponent,
        LayoutScrollTopComponent,
        ConnectedUsersInnerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        InlineSVGModule,
        RouterModule,
        NgbTooltipModule,
        SharedModule,
        SharedApplicationModule
    ],
    exports: [
        UserInnerComponent,
        LayoutScrollTopComponent,
        ConnectedUsersInnerComponent
    ],
})
export class ExtrasModule {
}

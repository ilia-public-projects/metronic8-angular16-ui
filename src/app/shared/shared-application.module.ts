import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AlertDangerComponent } from './components/alert-danger/alert-danger.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalLoadingIndicatorComponent } from './components/modal-loading-indicator/modal-loading-indicator.component';
import { ChangePasswordDialogComponent } from './components/change-password-dialog/change-password-dialog.component';
import { BackImgDirective } from './directives/background-image-directive';
import { AvatarEditorComponent } from './components/avatar-editor/avatar-editor.component';
import { SignalRComponent } from './components/signalR/signalR.component';
import { ChangeUserAvatarDialogComponent } from './components/change-user-avatar-dialog/change-user-avatar-dialog.component';
import { TableFilterComponent } from './components/table-filter/table-filter.component';

@NgModule({
    declarations: [
        AlertDangerComponent,
        ModalLoadingIndicatorComponent,
        ChangePasswordDialogComponent,
        BackImgDirective,
        AvatarEditorComponent,
        SignalRComponent,
        ChangeUserAvatarDialogComponent,
        TableFilterComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
        AccordionModule.forRoot(),
        TypeaheadModule.forRoot(),
        PopoverModule.forRoot(),
        TooltipModule.forRoot(),
        BsDropdownModule.forRoot(),
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        PaginationModule,
        AccordionModule,
        BsDatepickerModule,
        TypeaheadModule,
        PopoverModule,
        ModalModule,
        TooltipModule,
        AlertDangerComponent,
        BsDropdownModule,
        ModalLoadingIndicatorComponent,
        ChangePasswordDialogComponent,
        BackImgDirective,
        AvatarEditorComponent,
        SignalRComponent,
        ChangeUserAvatarDialogComponent,
        TableFilterComponent
    ],
    providers: []
})

export class SharedApplicationModule { }

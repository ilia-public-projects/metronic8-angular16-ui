import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-modal-loading-indicator',
    templateUrl: './modal-loading-indicator.component.html',
})
export class ModalLoadingIndicatorComponent{
    @Input() public isLoading: boolean = false;
}
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-alert-danger',
    templateUrl: './alert-danger.component.html'
})
export class AlertDangerComponent {
    @Input() messages: string[];

    public hideAlert() {

    }

}

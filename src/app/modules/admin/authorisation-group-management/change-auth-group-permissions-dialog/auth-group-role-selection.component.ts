import { Component, Input } from "@angular/core";
import { AuthorisationGroupRoleSelectionModel } from "./models/authorisation-group-role-selection.model";



@Component({
    selector: 'app-auth-group-role-selection',
    templateUrl: 'auth-group-role-selection.component.html',
})
export class AuthGroupRoleSelectionComponent {
    @Input() roles: AuthorisationGroupRoleSelectionModel[];

    public toggleShowChildren(role: AuthorisationGroupRoleSelectionModel) {
        role.showChildren = !role.showChildren;
        role.icon = role.showChildren ? 'fa-minus' : 'fa-plus';
    }

    public roleSelected(role: AuthorisationGroupRoleSelectionModel, $event: any) {
        const isSelected: boolean = !role.selected;
        this.updateChildRoleSelection(role, isSelected);
    }

    private updateChildRoleSelection(role: AuthorisationGroupRoleSelectionModel, selected: boolean) {

        role.selected = selected;
        if (role.children && role.children.length > 0) {
            role.children.forEach((child) => {
                this.updateChildRoleSelection(child, selected);
            });
        }
    }
}

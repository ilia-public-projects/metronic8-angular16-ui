export class AuthorisationGroupRoleSelectionModel {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public roleCount: number,
        public selected: boolean,
        public children: AuthorisationGroupRoleSelectionModel[],
        public hasParents: boolean,
        public showChildren: boolean,
        public icon: string
    ) {

    }
}

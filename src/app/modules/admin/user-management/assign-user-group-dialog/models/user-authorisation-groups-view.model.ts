export class UserAuthorisationGroupsViewModel {
    constructor(
        public name: string,
        public groups: UserAuthorisationGroupModel[],
    ) { }
}

export class UserAuthorisationGroupModel {
    constructor(
        public groupId: string,
        public groupName: string,
        public isSelected: boolean,
    ) { }
}
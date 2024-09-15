export interface GetUserAuthorisationGroupsResponse {
    data: UserAuthorisationGroups;
}

export interface UserAuthorisationGroups {
    name: string,
    groups: UserAuthorisationGroup[];
}

export interface UserAuthorisationGroup {
    groupId: string;
    groupName: string;
    isSelected: boolean;

}

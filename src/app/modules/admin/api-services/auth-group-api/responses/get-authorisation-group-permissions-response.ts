export interface GetAuhtorisationGroupPermissionsResponse {
    data: ResponseAuthorisationGroupPermission;
}

export interface ResponseAuthorisationGroupPermission {
    name: string;
    roles: ResponseAuthorisationGroupRoleSelection[];
}

export interface ResponseAuthorisationGroupRoleSelection {
    id: string;
    name: string;
    description: string;
    roleCount: number;
    selected: boolean;
    children: ResponseAuthorisationGroupRoleSelection[];
    hasParents: boolean;
    showChildren: boolean;
    icon: string;
}

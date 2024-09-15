import { PagedResult } from "../../../../../shared/shared-api-models/page-result";

export interface PostSearchAuthorisationGroupResponse{
    data: PagedResult<ResponseAuthorisationGroupSearchResult>;
}

export interface ResponseAuthorisationGroupSearchResult {
    id: string;
    name: string;
}

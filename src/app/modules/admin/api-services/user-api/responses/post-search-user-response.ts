import { PagedResult } from "../../../../../shared/shared-api-models/page-result";
import { UserSearchResponseResult } from "../models/response-user-search-result";


export interface PostSearchUserResponse {
    data: PagedResult<UserSearchResponseResult>;
}



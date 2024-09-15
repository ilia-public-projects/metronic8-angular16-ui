import { PaginationQuery } from "../../../../../shared/shared-api-models/pagination-query";

export class RequestUserSearchCriteria extends PaginationQuery {
    constructor(
        public name?: string,
        public email?: string,
        public includeInactive?: boolean
    ) {
        super();
    }
}
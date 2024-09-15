export interface PagedResult<T> {
    totalCount: number;
    results: T[];
}
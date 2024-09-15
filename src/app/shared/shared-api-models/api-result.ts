export interface ApiResult<T> {
    success: boolean;
    errorCode: string;
    errorMessages: string[];
    response: T;
}
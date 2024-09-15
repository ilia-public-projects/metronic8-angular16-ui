import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { PostNewUserRequest } from './requests/post-new-user-request';
import { PostSearchUserRequest } from './requests/post-search-user-request';
import { PutChangePasswordRequest } from './requests/put-change-password-request';
import { PutUpdateUserAuthorisationGroupsRequest } from './requests/put-update-user-authorisation-groups-request';
import { PutUpdateUserRequest } from './requests/put-update-user-request';
import { GetAllUserResponse } from './responses/get-all-user-response';
import { GetUserAuthorisationGroupsResponse } from './responses/get-user-authorisation-group-response';
import { GetUserResponse } from './responses/get-user-response';
import { PostSearchUserResponse } from './responses/post-search-user-response';
import { PutChangeUserPhotoRequest } from './requests/put-change-user-photo-request';
import { ApiResult } from '../../../../shared/shared-api-models/api-result';
import { environment } from '../../../../../environments/environment';
import { FormDataUtils } from '../../../../shared/utilities/form-data-utils';
import { PutChangeUserPhotoResponse } from './responses/put-change-user-photo-response';

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    private baseUrl = `/api/user`;

    constructor(
        private http: HttpClient
    ) {
        this.baseUrl = `${environment.apiUrl}${this.baseUrl}`;
    }

    public search(criteria: PostSearchUserRequest) {
        const url = `${this.baseUrl}/search`;
        return this.http.post<ApiResult<PostSearchUserResponse>>(url, criteria).pipe(take(1));
    }

    public create(model: PostNewUserRequest) {
        const url = `${this.baseUrl}`;

        return this.http.post<ApiResult<any>>(url, model).pipe(take(1));
    }

    public edit(id: string, request: PutUpdateUserRequest) {
        const url = `${this.baseUrl}/${id}`;
        return this.http.put(url, request).pipe(take(1));
    }

    public getById(id: string) {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<ApiResult<GetUserResponse>>(url).pipe(take(1));
    }

    public changePassword(request: PutChangePasswordRequest, targetUserId?: string) {
        let url = `${this.baseUrl}/changepassword`;
        if (targetUserId) {
            url = `${this.baseUrl}/${targetUserId}/changepassword`;
        }
        return this.http.put(url, request).pipe(take(1));
    }

    public getUserAuthorisationGroups(id: string) {
        const url = `${this.baseUrl}/${id}/authorisationgroups`;
        return this.http.get<ApiResult<GetUserAuthorisationGroupsResponse>>(url).pipe(take(1));
    }

    public updateUserAuthorisationGroups(id: string, request: PutUpdateUserAuthorisationGroupsRequest) {
        const url = `${this.baseUrl}/${id}/authorisationgroups`;
        return this.http.put(url, request).pipe(take(1));
    }

    public getAllUsers() {
        const url = `${this.baseUrl}/getall`;
        return this.http.get<ApiResult<GetAllUserResponse>>(url).pipe(take(1));
    }

    public updateProfilePhoto(request: PutChangeUserPhotoRequest, userId?: string) {
        let url = `${this.baseUrl}/photo`;
        if (userId) {
            url = `${this.baseUrl}/${userId}/photo`;
        }
        return this.http.put<ApiResult<PutChangeUserPhotoResponse>>(url, FormDataUtils.toFormData(request), { reportProgress: true, observe: 'events' });
    }
}

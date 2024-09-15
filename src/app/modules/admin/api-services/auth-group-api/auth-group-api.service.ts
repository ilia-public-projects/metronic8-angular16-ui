import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResult } from '../../../../shared/shared-api-models/api-result';
import { PostNewAuthorisationGroupRequest } from './requests/post-new-authorisation-group-request';
import { PutEditAuthorisationGroupRequest } from './requests/put-edit-authorisation-group-request';
import { PutUpdateAuthorisationGroupPermissions } from './requests/put-update-authorisation-group-permissions';
import { GetAuhtorisationGroupPermissionsResponse } from './responses/get-authorisation-group-permissions-response';
import { GetAuthorisationGroupResponse } from './responses/get-authorisation-group-response';
import { PostSearchAuthorisationGroupResponse } from './responses/post-search-authorisation-group-response';

@Injectable({
    providedIn: 'root'
})
export class AuthorisationGroupsApiService {
    private urlBase = `/api/authorisationgroups`;
    constructor(
        private http: HttpClient,
        ) {
            this.urlBase = `${environment.apiUrl}${this.urlBase}`;
    }

    public search() {
        const url = `${this.urlBase}/search`;
        return this.http.post<ApiResult<PostSearchAuthorisationGroupResponse>>(url, {}).pipe(take(1));
    }

    public create(model: PostNewAuthorisationGroupRequest) {
        const url = this.urlBase;
        return this.http.post(url, model).pipe(take(1));
    }

    public edit(id: string, model: PutEditAuthorisationGroupRequest) {
        const url = `${this.urlBase}/${id}`;
        return this.http.put(url, model).pipe(take(1));
    }

    public getById(id: string) {
        const url = `${this.urlBase}/${id}`;
        return this.http.get<ApiResult<GetAuthorisationGroupResponse>>(url).pipe(take(1));
    }

    public getPermissions(id: string) {
        const url = `${this.urlBase}/${id}/permissions`;
        return this.http.get<ApiResult<GetAuhtorisationGroupPermissionsResponse>>(url).pipe(take(1));
    }

    public updatePermissions(id: string, model: PutUpdateAuthorisationGroupPermissions) {
        const url = `${this.urlBase}/${id}/permissions`;
        return this.http.put(url, model).pipe(take(1));
    }

}

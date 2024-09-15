import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { PostLoginRequest } from './requests/post-login-request';
import { PostLoginResponse } from './responses/post-login-response';
import { environment } from '../../../../environments/environment';
import { ApiResult } from '../../../shared/shared-api-models/api-result';

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    private baseUrl = `${environment.apiUrl}`;

    constructor(
        private http: HttpClient
    ) {

    }

    public login(email: string, password: string) {

        const request = new PostLoginRequest(email, password);
        const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.http.post<ApiResult<PostLoginResponse>>(`${this.baseUrl}/oauth/token`, request, { headers: reqHeader }).pipe(take(1));

    }
}

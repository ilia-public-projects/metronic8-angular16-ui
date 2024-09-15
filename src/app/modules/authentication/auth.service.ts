import { Injectable, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, from, of } from 'rxjs';
import { catchError, finalize, map, take, tap } from 'rxjs/operators';
import { UserModel } from './models/user-model';
import { AuthApiService } from './api/auth-api.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    public user$ = new BehaviorSubject<UserModel | null>(null);

    private activeLogoutTimer: any;

    private isLoggingInSubject = new BehaviorSubject<boolean>(false);
    public isLoggingIn$ = this.isLoggingInSubject.asObservable();

    constructor(
        private apiService: AuthApiService,
        private router: Router
    ) {

    }

    ngOnDestroy() {
        if (this.activeLogoutTimer) {
            clearTimeout(this.activeLogoutTimer);
        }
    }

    public login(email: string, password: string) {
        this.isLoggingInSubject.next(true);

        return this.apiService.login(email, password).pipe(
            map(result => {
                if (result.success) {
                    this.setUserDataFromLoginToken(result.response.token);
                }

                return result.success;
            }),
            catchError((err) => {
                console.error('err', err);
                return of(false);
            }),
            finalize(() => this.isLoggingInSubject.next(false))
        );
    }

    public roleMatch(allowedRoles: string[], userRoles?: string[]): boolean {
        if (!userRoles) {
            return false;
        }

        return allowedRoles.some(x => userRoles.some(y => y == x));
    }

    private convertTokenDataToUser(token: any): UserModel {
        const helper = new JwtHelperService();
        const userObj = helper.decodeToken(token) as any;

        const result = new UserModel(userObj.id, userObj.email, userObj.name, JSON.parse(userObj.role), userObj.iss, userObj.exp, userObj.photoUri);

        return result;
    }

    private getCurrentUser(): UserModel | null {
        if (!this.token) { return null; }

        const result = this.convertTokenDataToUser(this.token);
        return result;

    }

    public logOut() {
        if (this.activeLogoutTimer) {
            clearTimeout(this.activeLogoutTimer);
        }
        this.user$.next(null);

        localStorage.removeItem('token');
    }

    get user() {
        return this.user$.asObservable().pipe(take(1));
    }

    public updateUserPhoto(photoUri?: string) {
        // photo updated write to local storage
        const photo = photoUri ? photoUri : '/assets/media/avatars/blank.png';
        const user = this.getCurrentUser();
        if (user) {
            user.photoUri = photo;
            this.user$.next(user);
        }

        localStorage.setItem('photoUri', photo);
    }

    autoLogin() {
        // if we dont have a token in local storage exist now
        if (!this.token) {
            return of(false);
        }
        return from(this.token).pipe(
            map(token => {
                // or if token has expired
                const user = this.getCurrentUser();
                if (user?.tokenExpired) {
                    return null;
                }
                this.setUserPhotoFromLocalStorage(user!);
                return user;
            }),
            tap(user => {
                // if we have the user next it now and reset auto logout duration
                if (user) {
                    this.user$.next(user);
                    this.autoLogout(user.tokenDuration);
                }
            }),
            map(user => {
                return !!user;
            })
        );
    }

    private setUserPhotoFromLocalStorage(user: UserModel) {
        const photo = localStorage.getItem('photoUri');
        if (photo) {
            user.photoUri = photo;
        }
    }


    private autoLogout(duration: number) {
        if (this.activeLogoutTimer) {
            clearTimeout(this.activeLogoutTimer);
        }
        this.activeLogoutTimer = setTimeout(() => {
            this.logOut();
        }, duration);
    }

    private get token() {
        return localStorage.getItem('token');
    }

    public logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('photoUri');
        
        this.router.navigate(['/auth/login'], {
            queryParams: {},
        });
    }

    private set token(value: any) {
        localStorage.setItem('token', value);
    }

    private setUserDataFromLoginToken(token: any) {
        this.token = token;
        const user = this.getCurrentUser();

        if (user) {
            const photo = user.photoUri ? user.photoUri : '/assets/media/avatars/blank.png';
            localStorage.setItem('photoUri', photo);
        }

        this.user$.next(user);

        this.autoLogout(user!.tokenDuration);
    }
}

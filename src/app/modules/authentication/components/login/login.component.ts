import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

    public loginForm: FormGroup;
    public hasError: boolean;
    public returnUrl: string;

    public isLoggingIn$: Observable<boolean>;

    private defaultAuth: any = {
        email: 'email@yahoo.com',
        password: 'password',
    };
    private unsubscribe: Subscription[] = [];

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.isLoggingIn$ = this.authService.isLoggingIn$;

    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

    ngOnInit(): void {

        this.initForm();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    }

    private initForm() {
        this.loginForm = this.fb.group({
            email: [this.defaultAuth.email, [Validators.required, Validators.email]],
            password: [this.defaultAuth.password, Validators.required]
        });
    }

    public submit() {
        this.hasError = false;
        const email = this.email?.value;
        const password = this.password?.value;

        const loginSubscr = this.authService
            .login(email, password)
            .pipe(first())
            .subscribe((success) => {
                if (success) {
                    this.router.navigate([this.returnUrl]);
                } else {
                    this.hasError = true;
                }
            });

        this.unsubscribe.push(loginSubscr);
    }

    get email() {
        return this.loginForm!.get('email');
    }

    get password() {
        return this.loginForm!.get('password');
    }
}

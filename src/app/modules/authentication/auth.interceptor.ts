import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
        private router: Router
        ) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.headers.get('No-Auth') === "True") {
			return next.handle(req.clone());
		}

		if (localStorage.getItem('token') != null) {
			const clonedreq = req.clone({
				headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('token'))
			});

			return next.handle(clonedreq).pipe(tap(
				success => {

				},
				error => {
					if (error.status === 401) {
						this.router.navigate(['/login']);
					}
				}
			));

		}
		else {
			this.router.navigate(['/login']);
			return of();
		}
	}
}

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ClipboardModule } from 'ngx-clipboard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// #fake-start#
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './modules/authentication/auth.interceptor';
import { AuthService } from './modules/authentication/auth.service';
import { SharedApplicationModule } from './shared/shared-application.module';
// #fake-end#

function appInitializer(authService: AuthService) {
    return () => {
        return new Promise((resolve) => {
            // todo attempt to resolve token before bootstrap to prevent initial flash
            resolve(true);
            //@ts-ignore
           // authService.getUserByToken().subscribe().add(resolve);
        });
    };
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        HttpClientModule,
        ClipboardModule,
        ToastrModule.forRoot(),
        AppRoutingModule,
        InlineSVGModule.forRoot(),
        NgbModule,
        SharedApplicationModule
       
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            multi: true,
            deps: [AuthService],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'app/Services/Auth.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private loadingService: NgxSpinnerService, private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = localStorage.getItem('token');
        if (token) {
            this.loadingService.show();
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + window.atob(token)
                }
            });
        }

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.loadingService.hide();
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this.loadingService.hide();
                if (error.status === 401) {
                    this.authService.logOut();
                }
                return throwError(error);
            }));
    }
}
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const newReq = req.clone({
            headers: req.headers.set('Authorization',"Bearer "+this.authService.get_token())
        });

        return next.handle(newReq)
    }

}
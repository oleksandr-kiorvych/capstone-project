import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersistanceService } from 'src/app/shared/utils/services/persistance.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(private persistanceService: PersistanceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.persistanceService.get('accessToken');
    const clearToken = token?.replace(/"/g, '');
    const headers = new HttpHeaders({
      authorization: `Bearer ${clearToken}`,
      'Content-Type': 'application/json',
    });
    const authReq = request.clone({ headers });
    return next.handle(authReq);
  }
}

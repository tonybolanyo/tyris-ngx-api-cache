import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ApiCacheService } from './api-cache.service';
import { ApiCacheConfig, ApiCachedResponse, DEFAULT_REQUEST_NOCACHE_HEADER, DEFAULT_RESPONSE_HEADER } from './models';

@Injectable()
export class ApiCacheInterceptor implements HttpInterceptor {

  constructor(
    private cache: ApiCacheService,
    private config: ApiCacheConfig,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const cacheKey = request.urlWithParams;
    const cached = this.cache.get(cacheKey);

    const noCacheHeader = this.config.requestNoCacheHeader || DEFAULT_REQUEST_NOCACHE_HEADER
    if (cached) {
      if (cached.expired || request.headers.has(noCacheHeader)) {
        this.cache.invalidateKey(cacheKey);
      } else {
        return of(cached.response);
      }
    }

    return next.handle(request).pipe(
      tap((response: any) => {
        if (response instanceof HttpResponse) {
          const caching = new ApiCachedResponse(request.urlWithParams, response, this.config);
          const responseHeader = this.config.responseHeader || DEFAULT_RESPONSE_HEADER;
          caching.response.headers.set(responseHeader, caching.date.toISOString());
          this.cache.set(request.urlWithParams, caching);
        }
      })
    );
  }
}

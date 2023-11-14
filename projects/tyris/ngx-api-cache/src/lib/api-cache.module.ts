import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiCacheComponent } from './api-cache.component';
import { ApiCacheInterceptor } from './api-cache.interceptor';
import { ApiCacheConfig, IApiCacheConfig } from './models';



@NgModule({
  declarations: [
    ApiCacheComponent
  ],
  imports: [
  ],
  exports: [
    ApiCacheComponent
  ],
})
export class ApiCacheModule {
  static forRoot(config: IApiCacheConfig): ModuleWithProviders<ApiCacheModule> {
    const defaultConfig = new ApiCacheConfig();
    if (!config.config) {
      defaultConfig.update(config);
    }
    return {
      ngModule: ApiCacheModule,
      providers: [
        config.config || { provide: ApiCacheConfig, useValue: defaultConfig },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiCacheInterceptor,
          multi: true
        },
      ]
    };
  }
}

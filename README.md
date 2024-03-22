# Tyris NgxApiCache

This library provides a simple cache mechanism for every
backend http call based on two main elements:

- `ApiCacheInterceptor`: intercept every request and decide
  if request have to be performed or a valid cached result
  is available.
- `ApiCacheService`: manage cache status and operations.

## Installation

- With npm: `npm install @tyris/ngx-api-cache`
- With yarn: `yarn add @tyris/ngx-api-cache`

## How to use

1. Import module in `app.module.ts`
2. Configure cache operation parameters (or use the default ones)

```ts
import { ApiCacheModule } from "@tyris/ngx-api-cache";

...

@NgModule({
  declarations: [],
  imports: [
    ...,
    ApiCacheModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
...
```

Now, every http call will be intercepted and
cached for the number of minutes stored in
`timeToLive` property.

## Configuration parameters available

You could override default parameters to
customize cache operation. This is a full
configuration object with default values:

```ts

const config: ApiCacheConfig {
  clearInterval: 15,
  requestNoCacheHeader: 'X-No-Cache',
  responseHeader: 'X-Cached-Response',
  timeToLive: 5,
}

```

## Invalidate cache entries

**Note:** all entries are stored in memory so
any page refresh clear all cache entries.

You can invalidate any key using the method
`invalidateKey(url)` from `ApiCacheService`.
To clear all saved entries, simply use the
`invalidateAll()` method.

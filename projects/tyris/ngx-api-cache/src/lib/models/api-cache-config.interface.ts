import { Provider } from "@angular/core";

export interface IApiCacheConfig {
  config?: Provider;

  timeToLive?: number;
  responseHeader?: string;
  clearInterval?: number;
  hardEndpoints?: string[];
  requestNoCacheHeader?: string;
}
import { HttpResponse } from "@angular/common/http";
import { ApiCacheConfig, DEFAULT_TIME_TO_LIVE } from "./api-cache-config.model";


export class ApiCachedResponse {
  /**
   * Date and time when this cache item were saved.
   */
  date: Date;

  /**
   * Full URL of the request which response will be saved.
   */
  url: string;

  /**
   * Response object to be cached.
   */
  response: HttpResponse<any>;

  /**
   * Return `true` if this cache entry has been saved for more than
   * time to live minutes configuration. Only full minutes will be
   * taken into account, i.e., if time spent is 3.8 then ttl will
   * be compared with 3.
   */
  get expired(): boolean {
    const ttl = this.config.timeToLive || DEFAULT_TIME_TO_LIVE;
    return Math.floor((Date.now() - this.date.getTime()) / 60000) > ttl;
  }

  constructor(url: string, response: HttpResponse<any>, private config: ApiCacheConfig) {
    this.date = new Date();
    this.url = url;
    this.response = response;
  }
}
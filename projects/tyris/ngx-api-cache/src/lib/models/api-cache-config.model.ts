import { IApiCacheConfig } from "./api-cache-config.interface";

export const DEFAULT_RESPONSE_HEADER = 'X-Cached-Response';
export const DEFAULT_TIME_TO_LIVE = 5;
export const DEFAULT_CLEAR_INTERVAL = 15;
export const DEFAULT_REQUEST_NOCACHE_HEADER = 'X-No-Cache';


export class ApiCacheConfig implements IApiCacheConfig {

  /**
   * Minutes to run the cache garbage collector.
   */
  clearInterval?: number;

  /**
   * How many minutes an entry will be cached for.
   */
  timeToLive?: number;

  /**
   * Custom header to read cached response datetime.
   */
  responseHeader?: string;

  /**
   * If request has this header, API cached response will be
   * invalidated and a new API call will be sent.
   * 
   * Result will be cached as the new cached value.
   */
  requestNoCacheHeader?: string;

  /**
   * List of endpoints to cache until will be manually cleared.
   */
  hardEndpoints?: string[];


  /**
   * Default values will be applied:
   * 
   * - timeToLive: 5 minutes
   * - responseHeader: X-Cached-Response
   * - clearInterval: 15 minutes
   * - hardEndpoints: []
   */
  constructor() {
    this.timeToLive = DEFAULT_TIME_TO_LIVE;
    this.responseHeader = DEFAULT_RESPONSE_HEADER;
    this.clearInterval = DEFAULT_CLEAR_INTERVAL;
    this.hardEndpoints = [];
    this.requestNoCacheHeader = DEFAULT_REQUEST_NOCACHE_HEADER;
  }


  /**
   * Updates api cache library configuration.
   * 
   * @param params Config object
   */
  update(params: IApiCacheConfig) {
    if ('clearInterval' in params) {
      this.clearInterval = params.clearInterval;
    }

    if ('hardEndpoints' in params) {
      this.hardEndpoints = params.hardEndpoints;
    }

    if ('requestNoCacheHeader' in params) {
      this.requestNoCacheHeader = params.requestNoCacheHeader;
    }

    if ('responseHeader' in params) {
      this.responseHeader = params.responseHeader;
    }

    if ('timeToLive' in params) {
      this.timeToLive = params.timeToLive;
    }
  }

}
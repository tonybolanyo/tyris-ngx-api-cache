import { Injectable } from '@angular/core';
import { ApiCacheConfig, ApiCachedResponse, DEFAULT_CLEAR_INTERVAL } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiCacheService {
  /**
   * A HashMap to store the cache.
   * The key is the page and the value is the data.
   */
  #cache = new Map<string, ApiCachedResponse>();

  /**
   * Keeps a reference to garbage collector timer.
   */
  #garbageCollector?: ReturnType<typeof setTimeout>;

  #lastCleared: number;
  /**
   * Returns the timestamp of the last full cache clear operation.
   */
  get lastCleared(): number {
    return this.#lastCleared;
  }

  get itemsCount(): number {
    return this.#cache.size;
  }

  constructor(private config: ApiCacheConfig) {
    this.#lastCleared = Date.now();
    this.startGarbageCollector();
  }

  ngOnDestroy(): void {
    this.stopGarbageCollector();
  }

  /**
   * The 'set' method for storing data in the cache.
   * 
   * @param key The page URL
   * @param data Data to be stored in cache
   */
  set(key: string, data: ApiCachedResponse, update = true): void {
    // We check if data already exists for this key.
    if (this.#cache.has(key) && !update) {
      // If it already exists, we throw an exception to prevent overwriting the data.
      throw new Error(`Data already exists for key '${key}'. Use a different key or delete the existing one first.`);
    }
    // If there is no data for this key, we store it in the cache and update the BehaviorSubject.
    this.#cache.set(key, data);
  }

  /**
   * The 'get' method for retrieving data from the cache.
   * 
   * @param key The page url
   * @returns The stored data
   */
  get(key: string): ApiCachedResponse | undefined {
    // We retrieve the data from the cache and update the BehaviorSubject.
    const data: ApiCachedResponse | undefined = this.#cache.get(key);
    return data;
  }

  /**
   * The 'clear' method to clear data from the cache.
   * 
   * @param key The page url
   */
  invalidateKey(key: string): void {
    // We remove the data from the cache and update the BehaviorSubject.
    this.#cache.delete(key);
  }

  /**
   * Invalidates all keys in the cache
   */
  invalidateAll(): void {
    this.#cache.clear();
  }

  /**
   * Setup a timer to remove expired entries from cache.
   */
  private startGarbageCollector() {
    if (this.#garbageCollector) {
      throw new Error('A garbage collector is alredy running.');
    }
    const interval = (this.config.clearInterval || DEFAULT_CLEAR_INTERVAL) * 60 * 1000;
    this.#garbageCollector = setInterval(() => {
      this.#cache.forEach((value: ApiCachedResponse, key: string) => {
        if (value.expired) {
          this.#cache.delete(key);
        }
      });
      this.#lastCleared = Date.now();
    }, interval);
  }

  /**
   * Stops the garbage collector.
   */
  private stopGarbageCollector() {
    clearInterval(this.#garbageCollector);
  }
}

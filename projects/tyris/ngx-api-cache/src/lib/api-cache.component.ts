import { Component } from '@angular/core';
import { ApiCacheService } from './api-cache.service';

@Component({
  selector: 'ty-api-cache-debugger',
  template: `
    <div class="cache-debugger">
      <table>
        <tr>
          <th>Last cleared</th>
          <td>{{ lastCleared }}</td>
        </tr>
        <tr>
          <th>Items count</th>
          <td>{{ cacheService.itemsCount }}</td>
        </tr>
      </table>
      <p><button type="btn" (click)="cacheService.invalidateAll()">Clear cache</button></p>
    </div>
  `,
  styles: [],
})
export class ApiCacheComponent {

  constructor(protected cacheService: ApiCacheService) { }

  get lastCleared(): Date {
    return new Date(this.cacheService.lastCleared);
  }

}

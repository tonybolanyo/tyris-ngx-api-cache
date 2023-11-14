import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo';
  planets$!: Observable<any>

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadPlanets();
  }

  loadPlanets(pageUrl?: string) {
    this.planets$ = this.api.fetchPlanets(pageUrl);
  }
}

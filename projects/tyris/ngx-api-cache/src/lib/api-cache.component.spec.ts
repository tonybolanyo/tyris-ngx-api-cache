import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCacheComponent } from './api-cache.component';

describe('NgxApiCacheComponent', () => {
  let component: ApiCacheComponent;
  let fixture: ComponentFixture<ApiCacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiCacheComponent]
    });
    fixture = TestBed.createComponent(ApiCacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

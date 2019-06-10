import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MatCardModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {NewsApiService} from './news-api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let apiService: NewsApiService;

  class MockApiService {
    initArticles() {}
    initSources() {}
    getArticlesByID(source: string) {}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatSidenavModule,
        BrowserAnimationsModule

      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: NewsApiService, useClass: MockApiService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
    component = fixture.debugElement.componentInstance;
    apiService = TestBed.get(NewsApiService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call initData on ngOnInit()', () => {
    const spy = spyOn(component, 'initData');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  describe('initData Method', () => {
    it('should call the initArticles method in the service', () => {
      const articleSpy = spyOn(apiService, 'initArticles').and.returnValue(of({}));
      const sourceSpy = spyOn(apiService, 'initSources').and.returnValue(of({}));
      component.initData();
      expect(articleSpy).toHaveBeenCalled();
      expect(sourceSpy).toHaveBeenCalled();
    });
  });

  describe('searchArticles Method', () => {
    it('should call the getArticlesById method in the service', () => {
      const spy = spyOn(apiService, 'getArticlesByID').and.returnValue(of({}));
      component.searchArticles('abc');
      expect(spy).toHaveBeenCalled();
    });

    it('should call the getArticlesById method with the id of abc', () => {
      const spy = spyOn(apiService, 'getArticlesByID').and.returnValue(of({}));
      component.searchArticles('abc');
      expect(spy).toHaveBeenCalledWith('abc');
    });
  });
});

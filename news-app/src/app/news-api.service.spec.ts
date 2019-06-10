import { TestBed } from '@angular/core/testing';

import { NewsApiService } from './news-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('NewsApiService', () => {
  let service: NewsApiService;
  let httpTestingController: HttpTestingController;
  const sourcesMock = {
    sources: [
      {
        id: 'abc',
        name: 'Test Source'
      }
    ]
  };

  const articlesMock = {
    articles: [
      {
        source: {
          id: 'abc',
          name: 'TechCrunch'
        },
        author: 'Braydon Coyer',
        title: 'Some Article'
      }
    ]
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: []
  }));

  beforeEach(() => {
    service = TestBed.get(NewsApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('InitSources Method', () => {
    it('should verify that the initSources Method performs a GET request', () => {
      service.initSources().subscribe(result => {
        expect(result).toBe(sourcesMock);
      });
      const req = httpTestingController.expectOne('https://newsapi.org/v2/sources?language=en&apiKey=f7111c6fd38c46409e86f69cc2d7315c');
      expect(req.request.method).toEqual('GET');
    });

    it('should call the initSources Method and return mock data', () => {
      service.initSources().subscribe(result => {
        expect(result).toBe(sourcesMock);
      });

      const req = httpTestingController.expectOne('https://newsapi.org/v2/sources?language=en&apiKey=f7111c6fd38c46409e86f69cc2d7315c');
      req.flush(sourcesMock);
    });
  });

  describe('InitArticles Method', () => {
    it('should verify that the initArticles Method performs a GET request', () => {
      service.initArticles().subscribe(result => {
        expect(result).toBe(articlesMock);
      });
      const req = httpTestingController.expectOne
      ('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=f7111c6fd38c46409e86f69cc2d7315c');
      expect(req.request.method).toEqual('GET');
    });

    it('should call the initSources Method and return mock data', () => {
      service.initArticles().subscribe(result => {
        expect(result).toBe(articlesMock);
      });

      const req = httpTestingController.expectOne
      ('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=f7111c6fd38c46409e86f69cc2d7315c');
      req.flush(articlesMock);
    });
  });

  describe('getArticlesById Method', () => {
    it('should verify that the getArticlesById Method performs a GET request', () => {
      service.getArticlesByID('abc').subscribe(result => {
        expect(result).toBe(articlesMock);
      });
      const req = httpTestingController.expectOne
      ('https://newsapi.org/v2/top-headlines?sources=abc&apiKey=f7111c6fd38c46409e86f69cc2d7315c');
      expect(req.request.method).toEqual('GET');
    });

    it('should call the initSources Method and return mock data', () => {
      service.getArticlesByID('abc').subscribe(result => {
        expect(result).toBe(articlesMock);
      });

      const req = httpTestingController.expectOne
      ('https://newsapi.org/v2/top-headlines?sources=abc&apiKey=f7111c6fd38c46409e86f69cc2d7315c');
      req.flush(articlesMock);
    });
  });
});

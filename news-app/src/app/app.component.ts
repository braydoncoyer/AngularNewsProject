import {Component, OnInit} from '@angular/core';
import {NewsApiService} from './news-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  mArticles: Array<any>;
  mSources: Array<any>;

  constructor(private newsService: NewsApiService) {}

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    // Load Articles and Sources
    this.newsService.initArticles().subscribe((data: any) => this.mArticles = data.articles);
    this.newsService.initSources().subscribe((data: any) => this.mSources = data.sources);
  }

  searchArticles(source) {
    this.newsService.getArticlesByID(source).subscribe((data: any) => this.mArticles = data.articles);
  }
}

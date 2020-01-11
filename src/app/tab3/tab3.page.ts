import { MovieService, SearchType } from '../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  results: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;
  constructor(private movieService: MovieService) {}

  ngOnInit() { }

  searchChanged() {
  // Call our service function which returns an Observable
  this.results = this.movieService.searchData(this.searchTerm, this.type);
}
}

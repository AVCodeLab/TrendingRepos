import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DataService {

  URL = 'https://api.github.com/search/repositories?q=sort=stars&order=desc'

  constructor(private http: HttpClient) { }

  getRepos() {
    return this.http.get(this.URL)
  }

}
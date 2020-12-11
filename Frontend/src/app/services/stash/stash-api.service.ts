import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StashApiService {

  url: string;
  header = { headers: { 'key': environment.backend.key } };

  constructor(private httpClient: HttpClient) {
    // this.url = environment.backend.protocol + '://' + environment.backend.host + ':' + environment.backend.port;
    this.url = environment.backendProd.url;
    // this.url = 'http://localhost:3000';
  }

  getCommits(project: string, repo: string): Promise<any> {
    return this.httpClient.get(this.url + '/stash/' + project + '/' + repo + '/commits', this.header).toPromise();
  }

  getTags(project: string, repo: string): Promise<any> {
    return this.httpClient.get(this.url + '/stash/' + project + '/' + repo + '/tags', this.header).toPromise();
  }

  getAvatar(project: string): Promise<any> {
    return this.httpClient.get(this.url + '/stash/' + project + '/avatar', this.header).toPromise();
  }

  getBranches(project: string, repo: string): Promise<any> {
    return this.httpClient.get(this.url + '/stash/' + project + '/' + repo + '/branches', this.header).toPromise();
  }

  getJiraKeys() {
    return this.httpClient.get(this.url + '/stash/jiraKeys', this.header).toPromise();
  }

  getPullRequests(project): Promise<any> {
    return this.httpClient.get(this.url + '/firebase/project/' + project + '/pull-requests', this.header).toPromise();
  }
}

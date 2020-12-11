import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JiraApiService {

  url: string;
  header = { headers: { 'key': environment.backend.key }};

  constructor(private httpClient: HttpClient) {
     //this.url = environment.backend.protocol + '://' + environment.backend.host + ':' + environment.backend.port;
    this.url = environment.backendProd.url;
    // this.url = 'http://localhost:3000';
  }

  getProjects(): Promise<any> {
    return this.httpClient.get(this.url + '/jira/projects', this.header).toPromise();
  }

  getProjectIssueCount(projectKey: string): Promise<any> {
    return this.httpClient.get(this.url + '/jira/project/' + projectKey, this.header).toPromise();
  }

  getJiraKeyLogo(projectKey: string): Promise<any> {
    return this.httpClient.get(this.url + '/jira/' + projectKey, this.header).toPromise();
  }
  
}

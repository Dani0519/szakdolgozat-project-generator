import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JenkinsApiService {

  url: string;
  header = { headers: { 'key': environment.backend.key } };

  constructor(private httpClient: HttpClient) {
    // this.url = environment.backend.protocol + '://' + environment.backend.host + ':' + environment.backend.port;
    this.url = environment.backendProd.url;
  }

  getPipelines(): Observable<any> {
    return this.httpClient.get(this.url + '/jenkins/pipelines', this.header);
  }

  getPipeline(pipeline: string): Promise<any> {
    return this.httpClient.get(this.url + '/jenkins/' + pipeline, this.header).toPromise();
  }

  getBuild(pipeline: string, build: string): Promise<any> {
    return this.httpClient.get(this.url + '/jenkins/' + pipeline + '/' + build, this.header).toPromise();
  }

  getViews(): Observable<any> {
    return this.httpClient.get(this.url + '/jenkins/views', this.header);
  }

  getJenkinsData(): Observable<any> {
    return this.httpClient.get(this.url + '/jenkins/data', this.header);
  }

  disableProject(pipelineName: string): Promise<any> {
    return this.httpClient.get(this.url + '/jenkins/' + pipelineName + '/disable', this.header).toPromise();
  }

  enableProject(pipelineName: string): Promise<any> {
    return this.httpClient.get(this.url + '/jenkins/' + pipelineName + '/enable', this.header).toPromise();
  }

}

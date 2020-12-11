import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GeneratorApiService {
  header = { headers: { 'key': environment.backend.key }};
  url: string;

  constructor(private httpClient: HttpClient) {
    //this.url = environment.backend.protocol + '://' + environment.backend.host + ':' + environment.backend.port;
   this.url = environment.backendProd.url;
  //  this.url = 'http://localhost:3000';
 }
  reCreateProject(projectKey: string, body: object): Promise<any> {
    return this.httpClient.post(this.url + '/generator/' +  projectKey + '/regenerate', body, this.header).toPromise();
  }
  createProject(projectKey: string, body: object): Promise<any> {
    return this.httpClient.post(this.url + '/generator/' +  projectKey + '/create', body, this.header).toPromise();
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DeploymentsPageModule } from '../../pages/deployments/deployments.module';

@Injectable({
  providedIn: 'root'
})
export class DeployAPIService {

  url: string;
  header = { headers: { 'key': environment.backend.key } };

  constructor(private httpClient: HttpClient) {
    this.url = environment.backendProd.url;
  }

  startPreStaging(project: string, user: string): Promise<any> {
    return this.httpClient.post(this.url + '/deploy/pre/' + project, { author: user } , this.header).toPromise();
  }

  startStaging(project: string, user: string, version: string, checkout: string, message: string): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post(this.url + '/deploy/staging/' + project, { author: user, version: version, checkout: checkout, message: message }, this.header).toPromise();
  }

  startProduction(project: string, user: string, version: string, checkout: string, message: string): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post(this.url + '/deploy/production/' + project, { author: user, version: version, checkout: checkout, message: message }, this.header).toPromise();
  }

  preStagingRollback(project: string, user: string, version: string, checkout: string, message: string): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post(this.url + '/rollback/' + project + '/pre', { author: user, version: version, checkout: checkout, message: message } , this.header).toPromise();
  }

  stagingRollback(project: string, user: string, checkout: string): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post(this.url + '/rollback/' + project + '/staging', { author: user, version: checkout, checkout: checkout, message: 'Rollback to ' + checkout } , this.header).toPromise();
  }

  productionRollback(project: string, user: string, checkout: string): Promise<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post(this.url + '/rollback/' + project + '/prod', { author: user, version: checkout, checkout: checkout, message: 'Rollback to ' + checkout } , this.header).toPromise();
  }

  

}

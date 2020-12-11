import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseapiService {

  url: string;
  header = { headers: { 'key': environment.backend.key } };

  constructor(private httpClient: HttpClient) {
    // this.url = environment.backend.protocol + '://' + environment.backend.host + ':' + environment.backend.port;
    this.url = environment.backendProd.url;
  }

  getDeployments(pipelineName: string): Promise<any> {
    return this.httpClient.get(this.url + '/firebase/deployment/' + pipelineName, this.header).toPromise();
  }

  getProjects(): Observable<any> {
    return this.httpClient.get(this.url + '/firebase/projects', this.header);
  }

  getUsers(): Promise<any> {
    return this.httpClient.get(this.url + '/firebase/users', this.header).toPromise();
  }

  registerUser(userData: any): Promise<any> {
    return this.httpClient.post(this.url + '/firebase/user', userData, this.header).toPromise();
  }

  deleteUser(uid: string): Promise<any> {
    return this.httpClient.delete(this.url + '/firebase/user/' + uid, this.header).toPromise();
  }

  enableUser(uid: string): Promise<any> {
    return this.httpClient.get(this.url + '/firebase/user/' + uid + '/enable', this.header).toPromise();
  }

  disableUser(uid: string): Promise<any> {
    return this.httpClient.get(this.url + '/firebase/user/' + uid + '/disable', this.header).toPromise();
  }


}

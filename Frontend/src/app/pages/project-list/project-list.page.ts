import { Component, OnInit } from '@angular/core';
import { FirebaseapiService } from '../../services/firebase/firebaseapi.service';
import { JiraApiService } from '../../services/jira/jira-api.service';
import { ProjectViewPage } from '../../modals/project-view/project-view.page';
import { ProjectCreatePage } from '../../modals/project-create/project-create.page';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.page.html',
  styleUrls: ['./project-list.page.scss'],
})
export class ProjectListPage implements OnInit {

  constructor(
    public modalController: ModalController,
    private firebaseApiService: FirebaseapiService,
    private jira: JiraApiService) { }

  dataFirebase: any;
  dataFirebase2: any;
  jiraKeysWeb = new Array();
  jiraKeysMobile = new Array();
  public spinner = false;

  jiraWebUrls = new Array();
  jiraMobileUrls = new Array();
  icon: string;
  filteredProjects = new Array();

  ngOnInit() {
    this.spinner = false;
    this.geProjectData();
  }
  async presentModal(projects: any, tab: any) {
    const modal = await this.modalController.create({
      component: ProjectViewPage,
      cssClass: 'project-view-modal',
      componentProps: {
      projects,
      tab
      }
    });
    modal.onDidDismiss().then(async () =>
      //await this.geProjectData()
      this.ngOnInit()
    );
    return await modal.present();
  }
  async createModal() {
    const modal = await this.modalController.create({
      component: ProjectCreatePage,
      cssClass: 'project-create-modal',
      componentProps: {},
      backdropDismiss: false
    });
    modal.onDidDismiss().then(async () =>
      this.ngOnInit()
    );
    return await modal.present();
  }
  async geProjectData() {
    this.filteredProjects = new Array();
    this.spinner = true;
    await this.firebaseApiService.getProjects().toPromise().then(data => {
      this.dataFirebase = data;
    });
    await this.getProjectLogos(this.dataFirebase);
    this.spinner = false;
  }

  async getProjectLogos(firebaseData) {
    this.jiraKeysWeb = new Array();
    firebaseData.forEach(async project => {
        this.jiraKeysWeb.push(project.jiraKey);
    });

    this.jiraKeysWeb.forEach(async (key, index) => {
      const url = environment.jiraIconUrl + key;
      firebaseData[index].url = url;
    });
    // this.dataFirebase = firebaseData;
    this.filteredProjects = firebaseData;
  }
  filterList(event: any): void {
    if (event.target.value === 'undefined' || event.target.value === '') {
      this.filteredProjects = this.dataFirebase;
    } else {
      this.filteredProjects = this.dataFirebase.filter(pipeline => pipeline.name.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }
}

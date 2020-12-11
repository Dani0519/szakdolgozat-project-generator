import { MaterialModule } from 'src/app/modules/material/material.module';
import { environment } from 'src/environments/environment';
import { Component, OnInit, Input, ViewChild, ElementRef, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { StashApiService } from '../../services/stash/stash-api.service';
import { GeneratorApiService } from '../../services/generator/generator-api.service';
import { AlertController } from '@ionic/angular';
import { FirebaseapiService } from '../../services/firebase/firebaseapi.service';
import { MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.page.html',
  styleUrls: ['./project-view.page.scss'],
})
export class ProjectViewPage implements OnInit {

  // Inputok elkérése

  @Input() projects: any;
  @Input() tab: any;
  @ViewChild('projectName', { static: false }) projectName: ElementRef;
  @ViewChild('repository', { static: false }) repository: ElementRef;
  @ViewChild('branch', { static: false }) branch: ElementRef;
  @ViewChild('folder', { static: false }) folder: ElementRef;
  @ViewChild('preID', {static: false}) preID: ElementRef;
  @ViewChild('projectDescription', { static: false }) projectDescription: ElementRef;
  @ViewChildren('site') sitesForm: QueryList<ElementRef>;
  @ViewChildren('aliases') aliases: QueryList<ElementRef>;

  icon: string;
  spinner: boolean;
  //dataFirebase: any;
  types = ['web', 'mobil'];
  selectType: string;
  selectBranch: string;
  selectJiraKey: string;
  listBranches = new Array();
  jiraApiKeys: any;
  listJiraKey = new Array();
  sites = {};

  selectedIndex: number = 0;
  public invoiceForm: FormGroup;
  constructor(
    private firebaseApiService: FirebaseapiService,
    private modalCtrl: ModalController,
    private _fb: FormBuilder,
    private stash: StashApiService,
    private generator: GeneratorApiService,
    public alertController: AlertController,
    private _snackBar: MatSnackBar
     ) { }

  ngOnInit() {
    this.selectType = this.projects.type;
    this.selectBranch = this.projects.branch;
    this.selectJiraKey = this.projects.jiraKey;
    this.geProjectData();
    this.selectTab(this.tab)
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()])
    });

    // api végpont a képekhez

    this.icon = environment.iconUrl + this.projects.jiraKey + '/avatar';
  }
  get formArr() {
    return this.invoiceForm.get('itemRows') as FormArray;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  // itt küldöm majd a jsont
  async log() {
    let valid: boolean = true;
    const aliasesArray = [];
    const sitesArray = [];
    const projectNames = new Array();
    const sitesStampArray = new Array();
    const urlRegex = /https:\/\/stash.sed.hu\/scm\/\w+\/.+.git/;
    let match: number;

    // Egyezés értékének beállítása
    if( this.repository.nativeElement.value.match(urlRegex)) {
      match = 0;
    } else {
        match = 1;
    }

    this.aliases.forEach((element: any) => {
      if (element.nativeElement.value === '') {
      } else {
        sitesStampArray.push(element.nativeElement.value);
      }
    });

    this.aliases.forEach((element: any) => {
      if (element.nativeElement.value === '') {
      } else if (element.nativeElement.value === 'pre') {
        aliasesArray.push('default');
      } else {
        aliasesArray.push(element.nativeElement.value);
      }
    });
    this.sitesForm.forEach((element: any) => {
      if (element.nativeElement.value === '') {
      } else {
        sitesArray.push(element.nativeElement.value);
      }
    });
    // create json

    sitesStampArray.forEach((key, i) => this.sites[key] = sitesArray[i]);
    let sites = {};
    sites = this.sites;

    const projectJson = {
      name: this.projectName.nativeElement.value,
      description: this.projectDescription.nativeElement.value,
      repository: this.repository.nativeElement.value,
      branch: this.selectBranch,
      type: this.selectType,
      folder: this.folder.nativeElement.value,
      aliases: aliasesArray,
      sites,
      jiraKey: this.selectJiraKey,
      'pre-id': this.preID.nativeElement.value
    };
    // this.dataFirebase.forEach((element: any) => {
    //   if( element === this.projectName.nativeElement.value) {

    //   } else {
    //   projectNames.push(element.name);
    //   }
    // });

    // Alertek kezelése
    if(projectNames) {

    }
    if (this.projectName.nativeElement.value === "" || this.repository.nativeElement.value === "" || this.folder.nativeElement.value === "" || this.preID.nativeElement.value === "") {
      this.emptyAlert();
      valid = false;
    } else if (match !== 0) {
      this.notValidStashUrl();
      valid = false;
    } else if ( this.selectJiraKey.toLowerCase() !== this.repository.nativeElement.value.split('/')[4].replace('.git', '')) {
      this.notTheSameKeyAlert();
      valid = false;
    }
    if (valid === true) {
      let response;
      this.spinner = true;
      await this.generator.reCreateProject(this.selectJiraKey, projectJson).then((data) => {
        response = data.status;
      });
      await this.delay(8000);
      this.spinner = false;
      if (response === 'okay') {
        this.openSnackBar('Sucessfully recreated', 'Okay');
        this.close();
      } else {
        this.openSnackBar('Something went wrong :(', 'Okay');
      }
    }
  }

  // kellenek a reaktív formhoz

  initItemRows() {
    return this._fb.group({
      itemname: ['']
    });
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  // mat-tab váltakozás gombtől függően

  selectTab(tab) {
    if (tab === 'View') {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex = 2;
    }
  }

  // bezárja a modalt
  close(): void {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  // leszedem ismét az összes prjektet hibakezeléshez

  async geProjectData() {
    this.spinner = true;
    let dataFirebase;
    await this.firebaseApiService.getProjects().toPromise().then(data => {
      dataFirebase = data;
    });

    // api végpont a branchez
    await this.apiBranches();
    await this.getJiraKeys();
    this.spinner = false;
  }

  // lekérem a brancheket apival majd a response lista szerkezete miatt be járom azt
  async apiBranches() {
    await this.stash.getBranches(this.projects.jiraKey, this.projects.repository.split('/')[5].replace('.git', '')).then(data => {
      for (let i =0; i < data.length; i++) {
        this.listBranches.push(data[i]['displayId']);
      }
    });
  }

  // lekérem az összes projektet és bejárom a jira kulcsokat

  async getJiraKeys() {
    this.jiraApiKeys = await this.stash.getJiraKeys();
    this.jiraApiKeys.forEach(element => {
      this.listJiraKey.push(element.key);
    });
  }

  // Alerts

  async emptyAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error!',
      subHeader: 'Empty fields!',
      message: 'All field must contain value!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async notTheSameKeyAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error!',
      subHeader: 'Keys are not the same!',
      message: 'The repository url not contains the choosen jiraKey!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async notValidStashUrl() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error!',
      subHeader: 'Not a valid inclouded stash url!',
      message: 'The url should look like this: https://stash.sed.hu/scm/{jiraKey}/{projectName}.git !',
      buttons: ['OK']
    });
    await alert.present();
  }
}

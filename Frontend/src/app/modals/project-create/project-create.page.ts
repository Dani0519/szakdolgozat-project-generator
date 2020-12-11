import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { StashApiService } from '../../services/stash/stash-api.service';
import { AlertController, ModalController } from '@ionic/angular';
import { MatStepper } from '@angular/material/stepper/typings/stepper';
import { GeneratorApiService } from '../../services/generator/generator-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.page.html',
  styleUrls: ['./project-create.page.scss'],
})
export class ProjectCreatePage implements OnInit {
  @ViewChildren('site') sitesForm: QueryList<ElementRef>;
  @ViewChildren('aliases') aliases: QueryList<ElementRef>;
  constructor(
    private _formBuilder: FormBuilder,
    private _fb: FormBuilder,
    private stash: StashApiService,
    public alertController: AlertController,
    private generator: GeneratorApiService,
    private _snackBar: MatSnackBar,
    private modalCtrl: ModalController
    ) {}

  isLinear = true;
  public invoiceForm: FormGroup;

  firstFormGroup: FormGroup;
  stashFormGroup: FormGroup;
  types = ['web', 'mobil'];
  jiraApiKeys: any;
  listJiraKey = new Array();
  listBranches = new Array();
  selectJiraKey: string;
  selectBranch: string;
  selectType: string;
  valid: boolean = true;
  aliasesArray = new Array();
  sitesArray = new Array();
  sites = {};
  spinner: boolean = false;

 ngOnInit() {
    this.getJiraKeys();
    this.firstFormGroup = this._formBuilder.group({
      projectName: ['', Validators.required],
      jiraKey: [this.selectJiraKey, Validators.required],
      projectRepository: ['', Validators.compose([Validators.pattern(/https:\/\/stash.sed.hu\/scm\/\w+\/.+.git/), Validators.required])],
      projectDescription: ['', Validators.required]
    });
    this.stashFormGroup = this._formBuilder.group({
      projectBranch: [this.selectBranch, Validators.required],
      projectFolder: ['', Validators.required],
      projectType: [this.selectType, Validators.required],
      projectPreId: ['', Validators.required]
    });
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()])
    });

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

  // recursive form
  initItemRows() {
    return this._fb.group({
      itemname: ['', Validators.required]
    });
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  async getJiraKeys() {
    this.jiraApiKeys = await this.stash.getJiraKeys();
    this.jiraApiKeys.forEach(element => {
      this.listJiraKey.push(element.key);
    });
  }
  async apiBranches() {
    this.listBranches = new Array();
    await this.stash.getBranches(this.firstFormGroup.get('jiraKey').value, this.firstFormGroup.get('projectRepository').value.split('/')[5].replace('.git', '')).then(data => {
      for (let i =0; i<data.length; i++) {
        this.listBranches.push(data[i]['displayId']);
      }
    });
  }
  // első form submitja
  firstSubmit(formData: any, stepper: MatStepper) {

    // regex ellenőrzés
    const urlRegex = /https:\/\/stash.sed.hu\/scm\/\w+\/.+.git/;
    let match: number;
    if(this.firstFormGroup.get('projectRepository').value.match(urlRegex)){
      match = 0;
    } else {
        match = 1;
    }
    if (this.firstFormGroup.get('projectName').value === '' || this.firstFormGroup.get('jiraKey').value === ''
        || this.firstFormGroup.get('projectRepository').value === '' || this.firstFormGroup.get('projectDescription').value === '') {
      this.emptyAlert();
      this.valid = false;
    } else if (match !== 0) {
      this.notValidStashUrl();
      this.valid = false;
    } else if (this.firstFormGroup.get('jiraKey').value.toLowerCase() !== this.firstFormGroup.get('projectRepository').value.split('/')[4].replace('.git', '')) {
      this.notTheSameKeyAlert();
      this.valid = false;
      stepper.previous();
    } else {
    this.apiBranches();
  }
}

stashSubmit(formData: any) {
  if (this.stashFormGroup.get('projectBranch').value === '' || this.stashFormGroup.get('projectFolder').value === '' || this.stashFormGroup.get('projectType').value === '') {
    this.emptyAlert();
    this.valid = false;
  }
}
async sitesSubmit() {
  this.aliasesArray = new Array();
  this.sitesArray = new Array();
  const sitesStampArray = new Array();


  this.aliases.forEach((element: any) => {
    if (element.nativeElement.value === '') {
    } else {
      sitesStampArray.push(element.nativeElement.value);
    }
  });
  this.aliases.forEach((element: any) => {
    if (element.nativeElement.value === '') {
    } else if (element.nativeElement.value === 'pre') {
      this.aliasesArray.push('default');
    } else {
      this.aliasesArray.push(element.nativeElement.value);
    }
  });
  this.sitesForm.forEach((element: any) => {
    if (element.nativeElement.value === '') {
    } else {
      this.sitesArray.push(element.nativeElement.value);
    }
  });
  // create json

  if (this.sitesArray.length === 0 || this.aliasesArray.length === 0 ) {
    this.emptySiteAlias();
    this.valid = false;
  } else {
    //this.aliasesArray.forEach((key, i) => this.sites[key] = this.sitesArray[i]);
    sitesStampArray.forEach((key, i) => this.sites[key] = this.sitesArray[i]);
    this.valid = true;
    await this.areYouSure();
  }
}

close(): void {
  this.modalCtrl.dismiss({
    dismissed: true
  });
}

// ALERTS
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

  async emptySiteAlias() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error!',
      subHeader: 'Empty site with alias!',
      message: 'At least one site-alias pair must be declared!',
      buttons: ['OK']
    });
    await alert.present();
  }
  async areYouSure() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure?',
      subHeader: 'Youa will create a new Inclouded project!',
      message: 'You will create a new project. Are all of your data valid?',
      buttons: [
        {
          text: 'No',
          role: 'Cancel',
          handler: () => {
            console.log('Cancel');
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            this.spinner = true;
            let sites = {};
            sites = this.sites;
            const projectJson = {
              name: this.firstFormGroup.get('projectName').value,
              description: this.firstFormGroup.get('projectDescription').value,
              repository: this.firstFormGroup.get('projectRepository').value,
              branch: this.stashFormGroup.get('projectBranch').value,
              type: this.stashFormGroup.get('projectType').value,
              folder: this.stashFormGroup.get('projectFolder').value,
              aliases: this.aliasesArray,
              sites,
              jiraKey: this.firstFormGroup.get('jiraKey').value,
              'pre-id': this.stashFormGroup.get('projectPreId').value
            };
            if (this.valid === true) {
              let response = 'okay';
              await this.generator.createProject(this.selectJiraKey, projectJson).then((data) => {
                response = data.status;
              });
              await this.delay(8000);
              this.spinner = false;
              if (response === 'okay') {
                this.openSnackBar('Project succesfully generated!', 'Okay');
                this.close();
              } else if (response === 'exist') {
                this.openSnackBar('Project with this name already exist!', 'Okay');
              } else {
                this.openSnackBar('Something went wrong with the creation :(', 'Okay');
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }
}

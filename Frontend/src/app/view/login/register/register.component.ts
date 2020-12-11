import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseapiService } from '../../../services/firebase/firebaseapi.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  name: string;

  constructor(private firebaseAuth: AngularFireAuth, private firebaseApi: FirebaseapiService, public dialogRef: MatDialogRef<RegisterComponent>,) { }

  ngOnInit() {}

  getEmail(event: any): void {
    this.email = event.target.value;
  }

  getPassword(event: any): void {
    this.password = event.target.value;
  }

  getName(event: any): void {
    this.name = event.target.value;
  }

  register(): void {
    const userData = { email: this.email, password: this.password, displayName: this.name };
    this.firebaseApi.registerUser(userData);
    this.dialogRef.close();
  }

}

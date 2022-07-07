import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {IonicModule} from '@ionic/angular';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ]
})
export class PagesModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { UsersComponent } from './users/users.component';
import { MatTableModule, MatSortModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DeviceEditComponent } from './devices/edit/device-edit.component';
import { DeviceListComponent } from './devices/list/device-list.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthService } from './shared/services/auth.service';
import { DomChangeDirective } from './shared/directives/dom-change.directive';
import { MessagesComponent } from './messages/messages.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationEditComponent } from './reservations/edit/reservation-edit.component';
import { ReservationListComponent } from './reservations/list/reservation-list.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RangeDatepickerComponent } from './shared/components/range-datepicker/range-datepicker.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DevicesComponent,
    UsersComponent,
    DeviceEditComponent,
    DeviceListComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SignUpComponent,
    SignInComponent,
    DomChangeDirective,
    MessagesComponent,
    ReservationsComponent,
    ReservationEditComponent,
    ReservationListComponent,
    RangeDatepickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
    Ng2GoogleChartsModule
  ],
  providers: [AngularFirestore, AngularFireAuth, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

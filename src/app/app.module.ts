import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { FilterComponent } from './components/home/filter/filter.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ShowingComponent } from './components/home/showing/showing.component';
import { TableComponent } from './components/home/showing/table/table.component';
import { SortbyComponent } from './components/home/showing/sortby/sortby.component';
import { PagesComponent } from './components/home/showing/pages/pages.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrantsComponent } from './components/home/showing/table/grants/grants.component';
import { OpenfdaComponent } from './components/home/showing/table/openfda/openfda.component';
import { S3Component } from './components/home/showing/table/s3/s3.component';
import { MenulabelPipe } from './pipes/menulabel.pipe';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GrantDetailsPopupComponent } from './components/home/showing/table/grants/grant-details-popup/grant-details-popup.component';
import { TabmenuComponent } from './components/home/tabmenu/tabmenu.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MultiselectdropdownComponent } from './components/home/filter/multiselectdropdown/multiselectdropdown.component';
import { DatefiltersComponent } from './components/home/filter/datefilters/datefilters.component';
import { DatepickerComponent } from './components/home/filter/datefilters/datepicker/datepicker.component';
import { ChatComponent } from './components/chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageComponent } from './components/chat/message/message.component';
import { LoginComponent } from './components/nav/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TopSearchResultComponent } from './components/home/top-search-result/top-search-result.component';
import { StructuredComponent } from './components/home/structured/structured.component';
import { SapComponent } from './components/home/showing/table/grants/sap/sap.component';
import { CtpComponent } from './components/home/showing/table/grants/ctp/ctp.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ImageUploadComponent } from './components/home/showing/table/grants/image-upload/image-upload.component';
import { PatentDataModalComponent } from './patent-data-modal/patent-data-modal.component';
import { MatButtonModule } from '@angular/material/button'; // Import the MatButtonModule
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog'; 
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FilterComponent,
    SearchbarComponent,
    ShowingComponent,
    TableComponent,
    SortbyComponent,
    PagesComponent,
    GrantsComponent,
    OpenfdaComponent,
    S3Component,
    MenulabelPipe,
    GrantDetailsPopupComponent,
    TabmenuComponent,
    MultiselectdropdownComponent,
    DatefiltersComponent,
    DatepickerComponent,
    ChatComponent,
    MessageComponent,
    LoginComponent,
    LoginPageComponent,
    TopSearchResultComponent,
    StructuredComponent,
    SapComponent,
    CtpComponent,
    ImageUploadComponent,
    TableComponent,
    PatentDataModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    SelectDropDownModule,
    NgbDatepickerModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule // Include MatButtonModul 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

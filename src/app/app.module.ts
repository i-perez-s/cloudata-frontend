import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { routing, appRoutingProviders } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { DataComponent } from "./components/data/data.component";
import { FileComponent } from "./components/file/file.component";
import { CreateDirComponent } from "./components/create-dir/create-dir.component";
import { UploadFileComponent } from "./components/upload-file/upload-file.component";

import { FilterPipe } from "./filterPipe"
import { UploadService } from "./services/upload.service";
import { ShareService } from "./services/share.service";
import { DataService } from "./components/data.service";
import { LinkComponent } from "./components/link/link.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { LoginService } from "./services/login.service";
import { NavComponent } from './components/nav/nav.component';
import { TextEditComponent } from './components/text-edit/text-edit.component';
import { ShareComponent } from './components/share/share.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    FileComponent,
    CreateDirComponent,
    UploadFileComponent,
    LinkComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    NavComponent,
    TextEditComponent,
    FilterPipe,
    ShareComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    routing,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [appRoutingProviders, UploadService, DataService, LoginService, ShareService],
  bootstrap: [AppComponent],
})
export class AppModule {}

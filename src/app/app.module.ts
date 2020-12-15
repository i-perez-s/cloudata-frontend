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

import { UploadService } from "./services/upload.service";
import { DataService } from "./components/data.service";
import { LinkComponent } from "./components/link/link.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { LoginService } from "./services/login.service";
import { NavComponent } from './components/nav/nav.component';

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
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    routing,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [appRoutingProviders, UploadService, DataService, LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}

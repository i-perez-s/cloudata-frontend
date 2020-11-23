import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { DataComponent } from './components/data/data.component';
import { FileComponent } from './components/file/file.component';
import { CreateDirComponent } from './components/create-dir/create-dir.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

import { UploadService } from './upload.service';
import { DataService } from './data.service';
import { LinkComponent } from './components/link/link.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    FileComponent,
    CreateDirComponent,
    UploadFileComponent,
    LinkComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [appRoutingProviders, UploadService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

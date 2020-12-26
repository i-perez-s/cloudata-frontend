import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DataComponent } from './components/data/data.component';
import { FileComponent } from './components/file/file.component';
import { LinkComponent } from './components/link/link.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ShareComponent } from './components/share/share.component';


const appRoutes: Routes = [
  {path: 'cloudData/:dir', component: DataComponent},
  {path: 'archivo/:type/:id', component: FileComponent},
  {path: 'link/:type/:link', component: LinkComponent},
  {path: 'compartidoConmigo/:path', component: ShareComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: SignUpComponent},
  {path: '**', component: HomeComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

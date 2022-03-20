import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { ShareModule } from '../share/share.module';
import { AddAlbumComponent } from './add-album/add-album.component';
import { GuardService } from '../guard.service';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // { path: 'admin/add', canActivate: [GuardService], component: AddAlbumComponent },
  // ]
  { path: 'admin/add', component: AddAlbumComponent },
]

@NgModule({
  imports: [
  // directives classiques à importer dans le module
  CommonModule,
  CommonModule,
  ShareModule,
  RouterModule.forChild(routes) // définition des routes dans le sous-module
  ],
  // déclarer le component dans le module
  declarations: [AlbumComponent, AddAlbumComponent],
  // exporter le component pour le reste de l'application
  exports : [AlbumComponent, RouterModule]
  })
  export class AdminModule { 
    



  }
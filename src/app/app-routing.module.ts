// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { LoginComponent } from './login/login.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService } from './guard.service';
import { AlbumComponent } from './admin/album/album.component';
import { CommonModule } from '@angular/common';
import { UpdateAlbumComponent } from './admin/update-album/update-album.component';

const routes: Routes = [
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/albums',
    pathMatch: 'full'
  },
  {
    path: 'album/:id',
    component: AlbumDescriptionComponent
  },
  {
    path: 'dashboard', canActivate: [GuardService],
    component: DashboardComponent
  },
  {
    path: 'admin',
    component: AlbumComponent
  },
  // {
  //   path: 'update/:id',
  //   component: UpdateAlbumComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule], 
  exports: [RouterModule]
})
export class AppRoutingModule { }

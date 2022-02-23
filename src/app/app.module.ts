import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'; // module des routes et classe de Tyimport { AppComponent } from './app.component';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginateComponent } from './paginate/paginate.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { HttpClientModule } from '@angular/common/http';



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { DashboardComponent } from './dashboard/dashboard.component';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAqziZdO6aGGFufyH3_Ax6nSU3-Q5ZZtk",
  authDomain: "app-music-a14d3.firebaseapp.com",
  projectId: "app-music-a14d3",
  storageBucket: "app-music-a14d3.appspot.com",
  messagingSenderId: "268413514055",
  appId: "1:268413514055:web:6a4b9b9cc3084c127cdc62",
  measurementId: "G-09L9XKL9BS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// définission de la constante pour les routes
const albumsRoutes: Routes = [
  {
  path: 'albums',
  component: AlbumsComponent
  },
  {
  path: '',
  redirectTo: '/albums',
  pathMatch: 'full'
  },
  {
  path: 'login',
  component: LoginComponent
  },
  {
  path: 'album/:id',
  component: AlbumDescriptionComponent
  },
  {
  path: 'dashboard',
  component: DashboardComponent
  },

];
  
@NgModule({
declarations: [
AppComponent,
AlbumsComponent,
AlbumDetailsComponent,
SearchComponent,
LoginComponent,
AlbumDescriptionComponent,
PaginateComponent,
AudioPlayerComponent,
DashboardComponent,
],
imports: [
BrowserModule,
FormsModule,
RouterModule.forRoot(albumsRoutes), // chargement des routes dans l'application
BrowserAnimationsModule,
HttpClientModule, // module HttpClient
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }

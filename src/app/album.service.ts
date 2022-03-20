import { Injectable } from '@angular/core';
import { Album, List } from './album';
import { AlbumsComponent } from './albums/albums.component';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';
import { Observable, Subject } from 'rxjs';
// Service et classe utile
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Opérateurs de RxJS
import { map } from 'rxjs/operators';
// libraire utile pour le traitement de données à installer
import * as _ from 'lodash';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


  // définition des headers
  const httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
  };

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  // private _albums: Album[] = ALBUMS;  
  private _albumList: any = ALBUM_LISTS;  
  subjectAlbum = new Subject<Album>(); // pour émettre des informations de l'écoute d'un Album

// convention dans l'API ajoutez votre identifant de base de données
private albumsUrl = 'https://app-music-a14d3-default-rtdb.europe-west1.firebasedatabase.app/albums';
private albumListsUrl = 'https://app-music-a14d3-default-rtdb.europe-west1.firebasedatabase.app/albumLists';
  
sendCurrentNumberPage = new Subject<number>(); // pour mettre à jour la pagination 
  
  constructor(private http: HttpClient) { } 
 
  // retourne la liste des albums avec pagination et tri decroissant sur la durée
  paginate(start: number, end: number): Observable<Album[]> {

    // Vous devez faire le mapping avant la récupération des données
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
      // Préparation des données pour avoir un format exploitable dans l'application
      // JSON en Array JSON
      map(albums => {
        let Albums: Album[] = [];
        albums.forEach((v: Album, k: any) => {
          v.id = k;
          Albums.push(v);
        });

        return Albums;
      }),
      // Ordonner les albums par ordre de durée décroissante
      map(albums => {
        return albums.sort(
          (a, b) => { return b.duration - a.duration }
        ).slice(start, end); // slicing des données
      })
    )
  }

  // compte le nombre d'albums
  count(): Observable<number> {

    return this.http.get<Album[]>(this.albumsUrl + '/.json').pipe(
      map(albums => albums.length),
    );
  }
  
  //retourne un album
  getAlbum(id: string): Observable<Album> {
    // URL/ID/.json pour récupérer un album
    return this.http.get<Album>(this.albumsUrl + `/${id}/.json`).pipe(
    map(album => album) // JSON
    );
    }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
    // Préparation des données avec _.values pour avoir un format exploitable dans l'applimap(albums => _.values(albums)),
    // Ordonnez les albums par ordre de durées décroissantes
    map(albums => {
      return albums.sort(
        (a, b) => { return b.duration - a.duration }
        );
      })
    )
  }
  
  //retourne la liste d’un album
  getAlbumList(id: string): Observable<List> {    
    return this.http.get<List>(this.albumListsUrl + `/${id}/.json`).pipe(      
     
    );
  }



  // méthode search
  search(word: string): Observable<Album[]> {

    return this.http.get<Album[]>(this.albumsUrl + `/.json`).pipe(
      map(albums => {
        let search: Album[] = [];
        let re = new RegExp('^' + word.trim())
        albums.forEach((v: Album, k: any) => {
          v.id = k;
          if (v.title.match(re) != null) search.push(v);
        })

        return search;
      })
    );
  }

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }

  // Audio-player 
  switchOn(album: Album): void {
    album.status = 'on';
    // le code ici s'exécute car souscription 
    this.http.put<void>(this.albumsUrl + `/${album.id}/.json`, album).subscribe(
      e => e,
      error => console.warn(error),
      () => {
        this.subjectAlbum.next(album);
      }
    );
  }

  switchOff(album: Album): void {
    album.status = 'off';
    this.http.put<void>(this.albumsUrl + `/${album.id}/.json`, album).subscribe(() => {
    });
  }




}

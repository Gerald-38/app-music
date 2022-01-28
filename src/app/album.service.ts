import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Album, List } from './album';
import { AlbumsComponent } from './albums/albums.component';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private _albums: Album[] = ALBUMS;
  private _albumList: List [] = ALBUM_LISTS;
  constructor() {  
    
}

 
  // retourne la liste des albums avec pagination et tri decroissant sur la durée
  paginate(start: number, end: number): Album[] {
    return this._albums.sort(
      (a, b) => {return b.duration - a.duration}
    ).slice(start, end);
  }

  // compte le nombre d'albums
  countAlbums(): Number {
    return this._albums.length;
  }
  
  //retourne un album
  getAlbum(id: string) {    
    return this._albums.find(album => album.id === id)
  }
  
  //retourne la liste d’un album
  getAlbumList( id : string) {
    return this._albumList.find(elem => elem.id === id);
  }

  // méthode search
  search(word: string): Album[] {
    let re = new RegExp(word.trim(), 'g');

    // filter permet de filter un tableau avec un test dans le test ci-dessous on vérifie 
    // deux choses : 1/ que album.title.match(re) n'est pas vide si c'est le contraire alors c'est pas faux
    // et 2/ si on a trouver des titres qui matchaient/t avec la recherche
    return this._albums.filter(album => album.title.match(re));
  }


}

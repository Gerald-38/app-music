import { Injectable } from '@angular/core';
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

  //retourne tous les albums
  getAlbums(): Album[] {
    // return this._albums;
    return this._albums.sort(function compare(a, b) {
      if (a.duration > b.duration)
        return -1;
      if (a.duration < b.duration)
        return 1;
      return 0;
    });  
  }  

  // compte le nombre d'albums
  countAlbums(): Number {
    return this._albums.length;
  }
  
  //retourne un album
  getAlbum( id: string) {    
    return this._albums.find(album => album.id === id)
  }
  
  //retourne la liste d’un album
  getAlbumList( id : string) {
    return this._albumList.find(elem => elem.id === id);
  }

}

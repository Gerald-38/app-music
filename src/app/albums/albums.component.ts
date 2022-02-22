import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';

import { Album } from '../album';
import { AlbumService } from '../album.service';
import { ALBUMS } from '../mock-albums';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  

  titlePage: string = "Page princiaple Albums Music";
  // albums: Album[] = ALBUMS;
  albums: any;
  selectedAlbum : Album;  
  album: any;
  idAlbum: string;
  albumsNumber: any;

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    // this.albums = this.albumService.getAlbums(); 
    this.albumsNumber = this.albumService.countAlbums();
    this.albums = this.albumService.paginate(0, this.albumsNumber);
    // console.log('Vous avez ' + this.albumsNumber + ' albums');       
  }  

  onSelect(album: Album) {    
    this.selectedAlbum = album;
  }
  
  playParent($event: any) {  
    this.idAlbum = $event.id; // identifiant unique
    // méthode dans le service
    this.albumService.switchOn($event);
     
  }

  search($event: any){
    if($event) this.albums = $event;
  }

    // mise à jour de la pagination
    paginate(album: { start: number; end: number; }) {
      this.albums = this.albumService.paginate(album.start, album.end);
    }

}




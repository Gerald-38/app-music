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

  constructor(private albumService: AlbumService) { }

  ngOnInit() {

    // this.albums = this.albumService.getAlbums();
    this.albums = this.albumService.paginate(0, 9);
    console.log('Vous avez ' + this.albumService.countAlbums() + ' albums');   
      
  }  

  onSelect(album: Album) {    
    this.selectedAlbum = album;
  }
  
  playParent(album: Album) {  
    this.idAlbum = album.id;      
  }

  search($event: any){
    if($event) this.albums = $event;
  }




  

}




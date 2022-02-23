import { Component, OnInit } from '@angular/core';
// import { Form } from '@angular/forms';

import { Album } from '../album';
import { AlbumService } from '../album.service';
// import { ALBUMS } from '../mock-albums';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  

  titlePage: string = "Page princiaple Albums Music";
  // albums: Album[] = ALBUMS;
  albums: Album[];
  selectedAlbum : Album;  
  // album: any;
  idAlbum: string;
  albumsNumber: any;
  count: any;

  constructor(private albumService: AlbumService) {
        // récupération des données depuis Firebase avec la méthode HttpClient
        console.log(this.albumService.getAlbums().subscribe(
          albums => console.log('*-*-*-*-*-*-*', albums)          
        ))
   }

  ngOnInit() {
    // this.albums = this.albumService.getAlbums(); 
    this.albumService.paginate(0, 5).subscribe(albums => this.albums = albums);
    this.count = this.albumService.count().subscribe(
      count => this.count = count
    ); 

    
    
  }  

  onSelect(album: Album) {    
    this.selectedAlbum = album;
  }
  
  playParent(album: Album) {  
    this.idAlbum = album.id; // identifiant unique
    // méthode dans le service
    // this.albumService.switchOn($event);
    this.albumService.switchOn(album);
     
  }

  search($event: any){
    if($event) this.albums = $event;
  }

    // mise à jour de la pagination
    paginate(album: { start: number; end: number; }) {
      this.albumService.paginate(album.start, album.end).subscribe(
        albums => this.albums = albums
      )
    }

}




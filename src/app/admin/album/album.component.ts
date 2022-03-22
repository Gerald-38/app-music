import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/album';
import { AlbumService } from 'src/app/album.service';
import { AdminModule } from '../admin.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})


export class AlbumComponent implements OnInit {
  albums: Album[];
  selectedAlbum: Album;
  message: string;

  constructor(private albumService: AlbumService, private router: Router) { }

  // ngOnInit(): void {
  //   this.albumService.getAlbums().subscribe(
  //     albums => this.albums = albums                
  //   )  
  // }

  ngOnInit(): void {
    this.albumService.paginate(0, 3).subscribe(albums => this.albums = albums);
  }

  paginate($event: { start: number; end: number; }) {
    this.albumService.paginate($event.start, $event.end).subscribe(
      albums => this.albums = albums
    );
  }

  onDelete(album: Album) {
    if (confirm('Voulez-vous vraiment supprimer cette ressource ?')) {
      let title: string = album.title;
      this.message = `L'album ${title} a bien été supprimé`;
      console.log(album, 'DELETE ALBUM ALBUM')

      this.albumService.deleteAlbum(album).subscribe(
        () => {
          this.router.navigate(['/admin']); 
        }
      )
    }
  }

}

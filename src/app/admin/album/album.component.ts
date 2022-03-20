import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/album';
import { AlbumService } from 'src/app/album.service';
import { AdminModule } from '../admin.module';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})


export class AlbumComponent implements OnInit {
  albums: Album[];

  constructor(private albumService: AlbumService) { }

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


}

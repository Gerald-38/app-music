import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Album, List } from '../album';
import { AlbumService } from '../album.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
  } from '@angular/animations';
  

import { ALBUM_LISTS } from '../mock-albums';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
  animations: [
    trigger('myAnimation', [
      // ...
      // définir l'état open de l'élément HTML
      state('open', style({
        height: '100px',
        opacity: 0.25,
        backgroundColor: 'blue'
      })),
      // définir l'état close de l'élément HTML
      state('close', style({
      height: '100px',
      opacity: 1,
      backgroundColor: 'red'
      })),
      transition('open => close', [
        animate('1000ms')
        ]),
    ]),
  ],
})

export class AlbumDetailsComponent implements OnInit {

  @Input() album: Album; // propriété [album] liée   
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();  

  albumLists: List[]; // récupération de la liste des chasons
  songs: any;
  list: any;
  // isActive: boolean = true;  
  
  constructor(private albumService: AlbumService) {    

   }

  ngOnInit(): void {  
      

  }

  // dès que quelque chose "rentre" dans le component enfant via une propriété Input
  // ou à l'initialisation du component (une fois) cette méthode est appelée
  ngOnChanges() {

    if(this.album) {
      // this.songs = this.albumService.getAlbumList(this.album.id)?.list;
      // récupération de la liste des chansons
      this.albumService.getAlbumList(this.album.id).subscribe(
        songs => this.songs = songs        
      );      
    }  
   
  }
  

  play(album: Album) {
    this.onPlay.emit(album); // émettre un album vers le parent     
  }



  
    

}

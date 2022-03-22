import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms'; // template-driven
import { AlbumService } from '../album.service';
import { Album } from '../album';

@Component({
selector: 'app-search',
templateUrl: './search.component.html',
styleUrls: ['./search.component.scss']
})



export class SearchComponent implements OnInit {
  value = 'Clear me';

  @Output() searchAlbums: EventEmitter<Album[]> = new EventEmitter(); // émission des données vers le parent

  constructor(private albumService: AlbumService) { }



mySearch: any;

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    /* let results = this.ablumService.search(form.value['word']);
    if (results.length > 0) {
      this.searchAlbums.emit(results);
    }
    console.log(form); */
    this.albumService.search(form.value['word']).subscribe(
      albums => {
        if (albums.length > 0) this.searchAlbums.emit(albums);
      }
    )
  }  


}

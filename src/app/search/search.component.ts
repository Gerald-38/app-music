import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms'; // template-driven
3
import { AlbumService } from '../album.service';
import { Album } from '../album';

@Component({
selector: 'app-search',
templateUrl: './search.component.html',
styleUrls: ['./search.component.scss']
})



export class SearchComponent implements OnInit {

constructor(private albumService: AlbumService) { }

@Output() searchAlbums: EventEmitter<Album[]> = new EventEmitter(); // émission des données vers le parent

mySearch: any;

  ngOnInit() {}

  onSubmit(form: NgForm): void {
    let results = this.albumService.search(form.value['word']);
    if (results.length > 0) this.searchAlbums.emit(results);
  }


}

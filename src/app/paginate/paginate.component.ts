import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {
  albumsNumber: any;
  albumsPerPage: number = 3;
  nbPages: number;
  pageRange: Array<number> = []; 

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.albumsNumber = this.albumService.countAlbums()
    console.log("Nombre total d'albums : " + this.albumsNumber);
    this.nbPages=Math.trunc(this.albumsNumber/this.albumsPerPage) + this.albumsNumber%this.albumsPerPage
    console.log("on affichera " + this.nbPages + " pages");
    for (let i = 1; i<=this.nbPages; i++) {
      this.pageRange.push(i);
    }
    console.log(this.pageRange)

  }

  // TODO : afficher automatiquement le nombre de pages das le template avec ngFor
  // RECUPERER LE NOMBRE DE PAGES DANS LE COMPONENT PARENT
  // IDEES :
    // CREER UN ARRAY AVEC LES DIFFERENTS START ET ENDS
    // RECUPERER CET ARRAY AVEC LE PARENT
    // BOUCLER SUR L ARRAY LA METHODE PAGINATE
    // UTILISER LA METHODE PAGINATE AVEC COMME PARAMETRE DE FIN LE NOMBRE TOTAL DIVISE PAR LE NOMBRE DE PAGE
    // POUR AFFICHER LES PAGES UTILISER LE CHIFFRE DE LA PAGE EN E MULTIPLIANT POUR DONNER LE BON PARAMETRE D AFFICHAGE DE PAGINATE






}

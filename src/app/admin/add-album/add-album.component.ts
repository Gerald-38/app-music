import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { AlbumService } from '../../album.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  albumForm = new FormGroup({
    name : new FormControl('', [
        Validators.required,
        Validators.minLength(5)
    ]),  
  });

  
 
  constructor(private fb : FormBuilder, private aS : AlbumService) {   
  }
  
  ngOnInit(): void { 
  }

  onSubmit() {
    console.log(this.albumForm.value['name']);
  }

  // CE MORCEAU DE CODE EST A METTRE DANS UNE FONCTION HORS DU CONSTRUCTEUR ET AUTRE ENSUITE IL FAUT L'APPELER DEPUIS NGONINIT
  // this.fb.group({
  //     name : new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(5)
  //     ]),
  // })
  // get name() {
  //   return this.albumForm.get('name');
  // } 

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/album';
import { AlbumService } from 'src/app/album.service';

@Component({
  selector: 'app-update-album',
  templateUrl: './update-album.component.html',
  styleUrls: ['./update-album.component.scss']
})
export class UpdateAlbumComponent implements OnInit {

  album: Album;
  updateFormAlbum: FormGroup;
  id : string;

  constructor(
    private route: ActivatedRoute,
    private aS: AlbumService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id'); // id dans l'url
    if(idParam)
    this.id = idParam;
    this.initUpdateForm(); // initialisation du formulaire 

    // mise à jour du formulaire après l'instanciation de ce dernier
    this.aS.getAlbum(this.id).subscribe(album => {
      // on récupère l'instance du formulaire et on met à jour les champs du formulaire
      // avec la méthode patchValue du formGroup
      this.updateFormAlbum.patchValue(album);
    }
    );
  }
  initUpdateForm() {

    this.updateFormAlbum = this.fb.group(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        title: new FormControl('', [
          Validators.required
        ]),
        ref: new FormControl('', [
          Validators.required,
          Validators.pattern('\\w{5}')
        ]),
        duration: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.max(900)
        ]),
        description: new FormControl('', [
          Validators.required
        ]),
        status: 'off',
        id : 0,
      }
    );

  }

  // getter pour la validation dans le formulaire errors
  get name() { return this.updateFormAlbum.get('name'); }
  get title() { return this.updateFormAlbum.get('title'); }
  get ref() { return this.updateFormAlbum.get('ref'); }
  get duration() { return this.updateFormAlbum.get('duration'); }
  

  onSubmit(){
    let album : Album;
    album = this.updateFormAlbum.value;
    album.id = this.id;

    /**
     * @todo observer methods next and error 
     */
    this.aS.updateAlbum(album).subscribe(
      () => {
        this.router.navigate(['/admin'], { queryParams: { message: 'success updated resource' } });
      }
    )
  }

}

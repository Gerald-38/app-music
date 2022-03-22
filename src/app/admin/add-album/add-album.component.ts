import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Album } from 'src/app/album';
import { AlbumService } from 'src/app/album.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  // définition de l'objet
  albumForm: FormGroup;

  constructor(private fb: FormBuilder,
    private aS: AlbumService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const AlbumStub: Album = {
      id: "",
      name: 'Albert',
      title: 'Un titre',
      ref: '45FTR',
      duration: 900,
      description: 'Une description...',
      status: "off"
    }

    this.albumForm = this.fb.group(
      {
        name: new FormControl(AlbumStub.name, [
          Validators.required,
          Validators.minLength(5)
        ]),
        title: new FormControl(AlbumStub.title, [
          Validators.required
        ]),
        ref: new FormControl(AlbumStub.ref, [
          Validators.required,
          Validators.pattern('\\w{5}')
        ]),
        duration: new FormControl(AlbumStub.duration, [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.max(900)
        ]),
        description: new FormControl(AlbumStub.description, [
          Validators.required
        ]),
        status: 'off'
      }
    )
  }
  // getter pour la validation dans le formulaire errors
  get name() {
    return this.albumForm.get('name');
  }
  get title() {
    return this.albumForm.get('title');
  }
  get ref() { return this.albumForm.get('ref'); 
  }
  get duration() { return this.albumForm.get('duration'); 
  }

  onSubmit(){
    
    let album: Album = {
      id : "",
      name: this.albumForm.value['name'],
      title: this.albumForm.value['title'],
      ref: this.albumForm.value['ref'],
      duration: this.albumForm.value['duration'],
      description: this.albumForm.value['description'],
      status: "off"
    }

    // HttpClient Observable se désinscrit tout seul après avoir terminé son action
    // get, post, put, ...
    this.aS.addAlbum(album).subscribe(
      () => {
        this.router.navigate(['/admin'], { queryParams: { message: 'success' } });
      }
    );
  }
}

import { Component, Input } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators'; // opérateurs
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-music';
  time: string;
  count: Observable<number>;

 
  constructor(public auth: AuthService) {

    // interval envoi toutes les secondes un compteur 1, 2, ...
    this.count = interval(1000);
    // on prépare les données avant de souscrire à l'Observable
    const interval$ = this.count.
      pipe(
        map(num => {
          const hours = Math.floor(num / 3600);
          const minutes = Math.floor(num / 60);

          return `${hours} h ${minutes - hours * 60} min ${num - minutes * 60} s`;
        }),
        take(12 * 60 * 3) // permet d'arrêter ici au bout de 12*3 minutes interval particulier à interval RxJS 6
      );

    // on souscrit à l'Observable interval
    interval$.subscribe(
      num => this.time = num
    );
  }
}

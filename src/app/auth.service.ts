// import { Injectable } from '@angular/core';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   [x: string]: any;

//   constructor() { }

//   // méthode d'authentification
//   auth(email: string, password: string): Promise<any> {
//     return firebase.auth().signInWithEmailAndPassword(email, password);        
//   }
// }

import { Injectable } from '@angular/core';

// Importez les modules nécessaires pour l'authentification
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // état de la connexion
  private authState: boolean = false;


  constructor(private router: Router) {
    // Observable il teste si l'utilisateur est connecté
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.authState = true;
      } else {
        this.authState = false;
      }
    });
  }

  auth(email: string, password: string): Promise<any> {

    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {

    firebase.auth().signOut().then(
      () => {
        this.router.navigate(['/albums'], { queryParams: { message: `Success logout` } });
      }
    );
  }

  // Return true if user is logged in
  authenticated(): boolean {
    return this.authState == true;
  }

}

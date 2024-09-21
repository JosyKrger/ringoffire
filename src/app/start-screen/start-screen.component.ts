import { Component } from '@angular/core';
import { Firestore, collection, addDoc, DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private firestore: Firestore, private router: Router) { }

  newGame() {
    let game = new Game();
    const gamesCollection = collection(this.firestore, 'games');
    addDoc(gamesCollection, game.toJson())
      .then((docRef: DocumentReference) => { 
        // Nach Spiel-Erstellung zur entsprechenden Route navigieren
        this.router.navigate(['/game', docRef.id]);
      })
      .catch((error: unknown) => {
        console.error('Error adding document: ', error);
      });
    this.router.navigateByUrl('/game');
  }
}

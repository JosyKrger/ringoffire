import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collectionData, collection, addDoc, DocumentReference, doc, docData, DocumentData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDialogContent,
    MatCardModule,
    GameInfoComponent,
    GameComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  game!: Game;
  animal!: string;
  name!: string;

  gameId!: string;

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog, private router: Router) { }


  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((params) => {
      // console.log(params['id']);
      this.gameId = params['id'];
      const gameDocRef = doc(this.firestore, `games/${this.gameId}`);
      docData(gameDocRef).subscribe((game: any) => {
        console.log('Game update', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    });

  }


  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || '';
      this.game.pickCardAnimation = true;
      console.log('New card: ' + this.game.currentCard);
      console.log('Game is ', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      window.setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }


  saveGame() {
    const gameRef = doc(this.firestore, `games/${this.gameId}`); // Erstellt eine Dokumentreferenz
    updateDoc(gameRef, this.game.toJson()) // Aktualisiert das Dokument mit den neuen Daten
      .then(() => {
        console.log('Game successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating game: ', error);
      });
  }
}

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { "title": "Ace", "description": "Waterfall: Everyone starts drinking, and no one can stop until the person to their right stops." },
    { "title": "2", "description": "You: You decide who drinks." },
    { "title": "3", "description": "Me: You drink." },
    { "title": "4", "description": "Floor: Last person to touch the floor drinks." },
    { "title": "5", "description": "Guys: All the guys drink." },
    { "title": "6", "description": "Girls: All the girls drink." },
    { "title": "7", "description": "Heaven: Last person to point to the sky drinks." },
    { "title": "8", "description": "Mate: Pick someone to be your mate. Whenever you drink, they drink too." },
    { "title": "9", "description": "Rhyme: Say a word, and everyone takes turns saying a word that rhymes. The first person who can't think of one drinks." },
    { "title": "10", "description": "Categories: Pick a category (e.g., types of fruit), and everyone must name something in that category. The first person who fails drinks." },
    { "title": "Jack", "description": "Make a Rule: You create a rule that everyone must follow. If someone breaks it, they drink." },
    { "title": "Queen", "description": "Question Master: You become the Question Master. Anyone who answers your questions must drink until a new Queen is drawn." },
    { "title": "King", "description": "King's Cup: Pour some of your drink into the cup in the middle. The person who draws the last King drinks the cup." }
  ];

  title = '';
  description = '';
  @Input() card!: string;

  ngOnInit(): void {
  }


  ngOnChanges(): void {
    if (this.card) {
      console.log('Current card is:', this.card);
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}

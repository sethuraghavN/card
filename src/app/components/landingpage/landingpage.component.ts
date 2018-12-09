import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Settings } from '../../services/settings.service';
import { CardComponent } from '../card/card.component';
import { Card } from '../../models/card.model';
import { RandomImg } from '../../models/randomImg.model';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  deckSize: number[];
  decknumber: number;
  deckNgFor: number[];
  cardCollection: Card[] = [];
  generateImgCollection: string[] = [];
  showGameBoard = false;
  currentTries = 0;
  imgSource: string;
  faceUpCardNumber = 0;
  isFaceUp = false;
  cardPair: Card[] = [];
  rowNumber: number[];

  constructor(private appSettings: Settings, private router: Router) {

  }

  ngOnInit() {
    const deckMax = +this.appSettings.numberofcards_max;
    const deckMin = +this.appSettings.numberofcards_min;
    this.decknumber = deckMin;

    if (deckMax > deckMin) {
      this.deckSize = this.RangeFill(deckMin, deckMax);
    } else {
      this.deckSize = this.RangeFill(3, 10);
    }

  }

  RangeFill(start, end) {
    return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
  }

  ShakeCards() {
    for (let i = this.cardCollection.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const itemAtIndex = this.cardCollection[randomIndex];
      this.cardCollection[randomIndex] = this.cardCollection[i];
      this.cardCollection[i] = itemAtIndex;
    }
  }

  RandomImg(): RandomImg {
    let isSame = true;
    let randomimage = '';
    while (isSame) {
      randomimage = this.appSettings.images[Math.floor(Math.random() * this.appSettings.images.length)];
      const isExistImgColl = this.generateImgCollection.filter(x => {
        if (x === randomimage) { return x; }
      });
      if (isExistImgColl.length === 0) {
        this.generateImgCollection.push(randomimage); isSame = false;
      }
    }
    const imageUrl = `../../../assets/images/cards/${randomimage}.png`;
    const resultRnd = {
      imageUrl: imageUrl,
      id: randomimage
    };
    return resultRnd;
  }

  StartGame() {
    this.deckNgFor = this.RangeFill(1, ((this.decknumber)));
    this.generateImgCollection = [];
    this.deckNgFor.forEach(() => {
      const generateIMG = this.RandomImg();
      const card = {
        img: generateIMG['imageUrl'],
        id: generateIMG['id'],
        status: 0
      };
      const card2 = {
        img: generateIMG['imageUrl'],
        id: generateIMG['id'],
        status: 0
      };
      this.cardCollection.push(card);
      this.cardCollection.push(card2);
    });
    this.ShakeCards();
    this.rowNumber = this.RangeFill(0,Math.round(this.cardCollection.length / 5));
    this.showGameBoard = true;
  }

  Flip(card) {
    this.faceUpCardNumber++;
    if (this.faceUpCardNumber < 3) {
      this.cardPair.push(card);
      card.status = 1;
      console.log(this.cardPair);
      if (this.faceUpCardNumber === 2) {
        this.Evaluate();
        this.currentTries++;
      }
    } else {

    }
  }

  Evaluate() {
    if (this.cardPair.length === 2) {
      if (this.cardPair[0].id === this.cardPair[1].id) {
        this.cardPair[0].status = 2;
        this.cardPair[1].status = 2;
        const isFinishGame = this.cardCollection.every(x => x.status === 2);
        if (isFinishGame) {
          alert('Játék vége! Gratulálok! Szép volt');
          this.router.navigate(['/start']);
        }
      } else {
        console.log('Nem egyformák');
      }
      this.cardPair = [];
      this.AllFlipOff();
    }

  }

  AllFlipOff() {
    setTimeout(() => {
      this.cardCollection.forEach((x) => {
        if (x.status === 1) {
          x.status = 0;
        }
      });
      this.faceUpCardNumber = 0;
    }, 1000);
  }

  Restart(){
    this.showGameBoard = false;
    this.cardCollection = [];
  }

}

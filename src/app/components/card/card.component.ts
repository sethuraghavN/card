import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input('cardObject') cardObject: Card;
  @Output('eventClick') eventClick = new EventEmitter();

  isFaceUp = false;
  isEnd = false;

  constructor() {

  }

  ngOnInit() {
  }

  Flip() {
    this.eventClick.emit(this.cardObject);
  }

}

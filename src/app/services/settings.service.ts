import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Settings {
  numberofcards_max = 10;
  numberofcards_min = 3;
  images = ['webpack', '', '#', '#', '#', '#', '#', '#', '#','#'];
}

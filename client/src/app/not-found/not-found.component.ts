import { Component, OnInit } from '@angular/core';
import * as config from './config/multi_en_config.json';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

 public word= (<any>config).errHand;

  constructor() { }
  ngOnInit() {
  }

}

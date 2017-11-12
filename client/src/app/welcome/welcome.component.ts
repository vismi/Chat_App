

/*====================importing modules===============*/

import { Component, OnInit } from '@angular/core';
import * as config from './config/multi_en_config.json';

@Component({
selector: 'app-welcome',
templateUrl: './welcome.component.html',
styleUrls: ['./welcome.component.css']
})

/*=================exporting class==================*/

export class WelcomeComponent implements OnInit {
public word= (<any>config).welcome;
constructor() { }
ngOnInit() {
}

}

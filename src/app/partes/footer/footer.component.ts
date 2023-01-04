import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin





@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  today= Date.now();

  constructor() { }

  ngOnInit(): void {

  }

}

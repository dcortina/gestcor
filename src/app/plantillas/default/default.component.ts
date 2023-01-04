import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  menuActive = true;

  constructor() { }

  ngOnInit(): void {
  }

  activaMenu(){
    this.menuActive=!this.menuActive;
  }
}
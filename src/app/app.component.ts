import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eccomerse-app';
  screenHeight: any;
  screenWidth: any;
  footerMaxHeight!: number;

  constructor() {
    this.getScreen()
  }

  @HostListener("window:resize", ['$evnet'])
  getScreen() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.footerMaxHeight = this.screenHeight - 160;
  }
}

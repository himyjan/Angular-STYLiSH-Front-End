import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/Footer/Footer.component';
import { HeaderComponent } from './components/Header/Header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <Header></Header>
    <div id='app'>
    <router-outlet></router-outlet>
    <Footer></Footer>
    </div>
  `,
  styles: [
    `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Noto Sans TC", sans-serif;
      }

      #app {
        min-height: 100vh;
        padding: 140px 0 0;
        position: relative;

        @media screen and (max-width: 1279px) {
          padding: 102px 0 60px;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'stylish-front-end';
}

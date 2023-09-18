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
    <router-outlet></router-outlet>
    <Footer></Footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'stylish-front-end';
}

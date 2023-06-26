import { Component } from '@angular/core';
import { CarouselComponent } from './Carousel.component';
import { ProductsComponent } from './Products.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CarouselComponent, ProductsComponent],
  template: `
    <Carousel></Carousel>
    <Products></Products>
  `,
  styles: [],
})
export class HomeComponent {
  title = 'stylish-front-end';
}

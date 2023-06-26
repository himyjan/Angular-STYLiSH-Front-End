import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartService } from './store/cart.service';
import { HomeComponent } from './pages/Home/Home.component';
import { ProductComponent } from './pages/Product/Product.component';
import { CheckoutComponent } from './pages/Checkout/Checkout.component';
import { ThankYouComponent } from './pages/ThankYou/ThankYou.component';
import { ProfileComponent } from './pages/Profile/Profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'products/:id', component: ProductComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'thankyou', component: ThankYouComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CartService]
})
export class AppRoutingModule { }

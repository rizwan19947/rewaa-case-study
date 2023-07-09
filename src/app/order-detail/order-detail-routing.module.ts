import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {OrderDetailResolver} from "./resolvers/order-detail.resolver";
import {orderDetailGuard} from "./guards/order-detail.guard";

const routes: Routes = [
  {
    path: '',
    component: OrderDetailComponent,
    resolve: {products: OrderDetailResolver},
    canActivate: [orderDetailGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDetailRoutingModule {
}

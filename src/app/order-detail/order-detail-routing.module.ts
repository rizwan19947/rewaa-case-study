import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {OrderDetailResolver} from "./resolvers/order-detail.resolver";

const routes: Routes = [
  {
    path: '',
    component: OrderDetailComponent,
    resolve: {products: OrderDetailResolver},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDetailRoutingModule {
}

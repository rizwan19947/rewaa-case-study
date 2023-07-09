import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ApiObject, OrderDetailService} from "../services/order-detail.service";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailResolver implements Resolve<ApiObject[]> {

  constructor(private orderDetailService: OrderDetailService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApiObject[]> {
    return this.orderDetailService.fetchProducts();
  }
}

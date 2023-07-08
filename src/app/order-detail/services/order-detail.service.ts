import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface ApiObject {
  title: string;
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private http: HttpClient) {
  }

  fetchProducts(): Observable<ApiObject[]> {
    return this.http.get<ApiObject[]>('https://fakestoreapi.com/products');
  }

}

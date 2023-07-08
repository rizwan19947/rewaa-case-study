import {Component, OnInit} from '@angular/core';
import {ApiObject} from "../services/order-detail.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

interface Supplier {
  name: string;
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  supplierFormControl = new FormControl<string>('', [Validators.required]);

  /**
   * Deduced from the type of dummy data being fetched
   */
  supplierOptions: Supplier[] = [{name: 'Clothing Supplier'}, {name: 'Accessories Supplier'}, {name: 'Tech Supplier'}, {name: 'Fashion Supplier'}];

  filteredOptions: Observable<Supplier[]> | undefined;

  products: ApiObject[] | undefined;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    /**
     * Getting data from Resolver
     */
    ({products: this.products} = this.route.snapshot.data);

    this.filteredOptions = this.supplierFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        /**
         * Incorrect compile time error detection for type 'never' - could be potentially linked
         * to some configuration within Angular 16. This didn't occur mid upgrades in Angular 15
         */
          // @ts-ignore
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.supplierOptions.slice();
      }),
    );

    console.warn("Getting product list from resolver:");
    console.warn(this.products);
  }

  supplierDisplayFn(user: Supplier): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Supplier[] {
    const filterValue = name.toLowerCase();

    return this.supplierOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}

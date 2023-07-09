import {Component, OnInit} from '@angular/core';
import {ApiObject} from "../services/order-detail.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

interface AutocompleteOptionsObject {
  name: string;
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderDetailsForm: FormGroup;
  supplierControl = new FormControl<string>('', [Validators.required]);
  locationControl = new FormControl<string>('', [Validators.required]);
  supplierInvoice = new FormControl<string>('', [Validators.required, Validators.pattern('^[0-9]*$')]);
  orderNotes = new FormControl<string>('', [Validators.max(200)]);

  /**
   * Only for autocomplete
   */
  productAutocompleteControl = new FormControl<string>('');

  /**
   * Deduced from the type of dummy data being fetched
   */
  supplierOptions: AutocompleteOptionsObject[] = [{name: 'Clothing Supplier'}, {name: 'Accessories Supplier'}, {name: 'Tech Supplier'}, {name: 'Fashion Supplier'}];
  productOptions: AutocompleteOptionsObject[] = [];

  supplierFilteredOptions: Observable<AutocompleteOptionsObject[]> | undefined;
  productFilteredOptions: Observable<AutocompleteOptionsObject[]> | undefined;

  products: ApiObject[] | undefined;
  locations: string[] = ['default Location'];
  readonly taxRatio: number = 0.15;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.orderDetailsForm = this.formBuilder.group({
      supplier: this.supplierControl,
      location: this.locationControl,
      supplierInvoice: this.supplierInvoice,
      notes: this.orderNotes,
    })
  }

  ngOnInit() {
    /**
     * Getting data from Resolver
     */
    ({products: this.products} = this.route.snapshot.data);

    this.assignProductOptions(this.products);
    this.assignProductFilteredOptions();
    this.assignSupplierFilteredOptions();

    console.warn("Getting product list from resolver:");
    console.warn(this.products);
  }

  supplierDisplayFn(user: AutocompleteOptionsObject): string {
    return user && user.name ? user.name : '';
  }

  productDisplayFn(product: ApiObject): string {
    if (product) {
      return `${product.id} ${product.title}`;
    } else {
      return '';
    }
  }

  private assignProductOptions(products: ApiObject[] | undefined) {
    if (products) {
      for (let a = 0; a < products.length; a++) {
        this.productOptions.push({
          name: `${products[a].id} ${products[a].title}`,
        });
      }
    }
  }

  private assignSupplierFilteredOptions() {
    this.supplierFilteredOptions = this.supplierControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        /**
         * Incorrect compile time error detection for type 'never' - could be potentially linked
         * to some configuration within Angular 16. This didn't occur mid upgrades in Angular 14 and 15
         */
          // @ts-ignore
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterSupplier(name as string) : this.supplierOptions.slice();
      }),
    );
  }

  private assignProductFilteredOptions() {
    this.productFilteredOptions = this.productAutocompleteControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        /**
         * Incorrect compile time error detection for type 'never' - could be potentially linked
         * to some configuration within Angular 16. This didn't occur mid upgrades in Angular 14 and 15
         */
          // @ts-ignore
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterProducts(name as string) : this.productOptions.slice();
      }),
    );
  }


  private _filterProducts(name: string): AutocompleteOptionsObject[] {
    const filterValue = name.toLowerCase();

    return this.productOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterSupplier(name: string): AutocompleteOptionsObject[] {
    const filterValue = name.toLowerCase();

    return this.supplierOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}

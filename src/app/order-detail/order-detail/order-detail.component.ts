import {Component, OnInit} from '@angular/core';
import {ApiObject} from "../services/order-detail.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

interface AutocompleteOptionsObject {
  name: string;
}

interface ProductAutocompleteOptionsObject {
  id: number;
  name: string;
}

interface SelectedProductsObject extends ApiObject {
  taxed: boolean;
  visible: boolean;
  valid: boolean;
  quantity: number;
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})

export class OrderDetailComponent implements OnInit {

  /**
   * For autocomplete
   */
  productAutocompleteControl = new FormControl<string>('');
  supplierFilteredOptions: Observable<AutocompleteOptionsObject[]> | undefined;
  productFilteredOptions: Observable<ProductAutocompleteOptionsObject[]> | undefined;

  orderDetailsForm: FormGroup;
  supplierControl = new FormControl<string>('', [Validators.required]);
  locationControl = new FormControl<string>('', [Validators.required]);
  supplierInvoice = new FormControl<string>('', [Validators.required, Validators.pattern('^[0-9]*$')]);
  orderNotes = new FormControl<string>('', [Validators.max(200)]);

  /**
   * Deduced from the type of dummy data being fetched
   */
  supplierOptions: AutocompleteOptionsObject[] = [{name: 'Clothing Supplier'}, {name: 'Accessories Supplier'}, {name: 'Tech Supplier'}, {name: 'Fashion Supplier'}];
  productOptions: ProductAutocompleteOptionsObject[] = [];


  products: ApiObject[] | undefined;
  selectedProducts: SelectedProductsObject[] | undefined = [];
  locations: string[] = ['default Location']; //Assumed to be only one location for now
  readonly taxRatio: number = 0.15;
  total: number = 0;
  totalPanelOpenState = false;

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

    /**
     * Initializing Mat-Autocompletes
     */
    this.assignProductOptions(this.products);
    this.assignProductFilteredOptions();
    this.assignSupplierFilteredOptions();

    console.warn("Getting product list from resolver:");
    console.warn(this.products);
  }

  supplierDisplayFn(supplier: AutocompleteOptionsObject): string {
    return supplier && supplier.name ? supplier.name : '';
  }

  productDisplayFn(product: ApiObject): string {
    if (product) {
      return `${product.id} ${product.title}`;
    } else {
      return '';
    }
  }

  addProductToSelected(product: ProductAutocompleteOptionsObject) {
    console.warn(product.name);
    console.warn(product.id);

    const foundItem = this.products?.find((item: ApiObject) => item.id === product.id);

    if (foundItem) {
      const selectedProductObject: SelectedProductsObject = {
        ...foundItem,
        visible: false,
        valid: true,
        taxed: false,
        quantity: 1,
      }

      this.selectedProducts?.push(selectedProductObject);
      this.productAutocompleteControl.reset();
    }
    console.warn(this.selectedProducts);
  }

  addTax(selectedProduct: SelectedProductsObject) {
    if (this.selectedProducts) {
      for (let a = 0; a < this.selectedProducts?.length; a++) {
        if (this.selectedProducts[a].id === selectedProduct.id) {
          this.selectedProducts[a].taxed = true;
          this.total = this.total + (this.selectedProducts[a].quantity * this.selectedProducts[a].price * this.taxRatio);
          console.warn(this.selectedProducts[a]);
        }
      }
    }
    this.recheckValidity(selectedProduct);
  }

  removeTax(selectedProduct: SelectedProductsObject) {
    if (this.selectedProducts) {
      for (let a = 0; a < this.selectedProducts?.length; a++) {
        if (this.selectedProducts[a].id === selectedProduct.id) {
          this.selectedProducts[a].taxed = false;
          this.total = this.total - (this.selectedProducts[a].quantity * this.selectedProducts[a].price * this.taxRatio);
          console.warn(this.selectedProducts[a]);
        }
      }
    }
    this.recheckValidity(selectedProduct);
  }

  preventExpanderOpening(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  deleteSelectedItem(product: SelectedProductsObject, event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.selectedProducts = this.selectedProducts?.filter((item: SelectedProductsObject) => item.id !== product.id);
    console.warn(this.selectedProducts);
  }

  reloadPage() {
    window.location.reload();
  }

  recheckValidity(selectedProduct: SelectedProductsObject) {
    if ((selectedProduct.quantity < 1 || selectedProduct.quantity === null || selectedProduct.price < 1 || selectedProduct.price === null) && this.selectedProducts) {
      for (let a = 0; a < this.selectedProducts.length; a++) {
        if (this.selectedProducts[a].id === selectedProduct.id) {
          this.selectedProducts[a].valid = false;
        }
      }
    } else {
      if (this.selectedProducts) {
        this.total = 0;
        for (let a = 0; a < this.selectedProducts.length; a++) {
          if (this.selectedProducts[a].id === selectedProduct.id) {
            this.selectedProducts[a].valid = true;
          }
        }
      }
    }
  }


  private assignProductOptions(products: ApiObject[] | undefined) {
    if (products) {
      for (let a = 0; a < products.length; a++) {
        this.productOptions.push({
          name: products[a].title,
          id: products[a].id,
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

  private _filterProducts(name: string): ProductAutocompleteOptionsObject[] {
    const filterValue = name.toLowerCase();

    return this.productOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterSupplier(name: string): AutocompleteOptionsObject[] {
    const filterValue = name.toLowerCase();

    return this.supplierOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}

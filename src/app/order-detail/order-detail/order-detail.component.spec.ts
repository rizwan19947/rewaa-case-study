import {ComponentFixture, TestBed, async} from '@angular/core/testing';

import {OrderDetailComponent} from './order-detail.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatAutocomplete} from "@angular/material/autocomplete";
import {dummyData} from "../models/test-data.model";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [OrderDetailComponent, MatAutocomplete]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(OrderDetailComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product data table', () => {
    component.products = dummyData;
    fixture.detectChanges();

    const productsTableContainer = el.queryAll(By.css('.product-table'));

    expect(productsTableContainer).toBeTruthy('Product/Product List does not exist!');
  });

  it('should display prepaid container', () => {
    component.products = dummyData;
    component.paymentPlan = 'prepaid';
    fixture.detectChanges();

    const paymentContainer = el.queryAll(By.css('.prepaid-container'));

    expect(paymentContainer).toBeTruthy('Incorrect payment container displayed!');
  });

  it('should display postpaid container', () => {
    component.products = dummyData;
    component.paymentPlan = 'postpaid';
    fixture.detectChanges();

    const paymentContainer = el.queryAll(By.css('.postpaid-container'));

    expect(paymentContainer).toBeTruthy('Incorrect payment container displayed!');
  });

  it('submit button should be initially disabled', () => {
    fixture.detectChanges();

    const submitButton = el.query(By.css('#submit-button')).nativeElement as HTMLButtonElement;

    expect(submitButton.disabled).toBeTruthy();
  });

  it('no products should be initially selected', () => {
    component.products = dummyData;
    fixture.detectChanges();

    /**
     * Checking selection by dom
     */
    expect(component.selectedProducts?.length).toBe(0, 'Not initially empty as expected');

    /**
     * Checking selection programmatically
     */
    expect(component.minimumProductsSelected()).toBe(false, 'Not initially empty as expected');
  });
});



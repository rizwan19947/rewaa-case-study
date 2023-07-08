import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderDetailRoutingModule} from './order-detail-routing.module';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {MatCardModule} from "@angular/material/card";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    OrderDetailRoutingModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class OrderDetailModule {
}

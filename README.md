# RewaaCaseStudy

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.2, but later updated
to 16.1.4.

## Dummy Data API

FakeStoreApi is used to serve the dummy data for products and the interface for the response object
is then extended with more properties to meet the project requirements.
https://fakestoreapi.com/docs

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

After running on dev server, please navigate to `http://localhost:4200/order-detail` to view the page.

## Assumptions and Premises

Initially, I assumed that the account detail page is supposed to have an `AccountGuard` to restrict navigation to the
component
for only authorized users, however, since authentication fell outside the scope of the case study, therefore, I only
added
it as a placeholder instead.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

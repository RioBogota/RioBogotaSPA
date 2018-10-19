# RIOBOGOTASPA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Docker configuration

To genearate docker image run this command on a bash (including dot)

    docker build -t rio-bogota .

To run docker container in main mode run this command for windows

    docker run -it -v %cd%:/usr/src/app -v /usr/src/app/node_modules -p 4200:4200 --rm rio-bogota

for linux user run

    docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 4200:4200 --rm rio-bogota

to run docker container in background mode run this command for windows

    docker run -d -v %cd%:/usr/src/app -v /usr/src/app/node_modules -p 4200:4200 --name rio-bogota-container rio-bogota

for linux user run

    docker run -d -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 4200:4200 --name rio-bogota-container rio-bogota

Stop and then remove the container once done:

    docker stop rio-bogota-container
    docker rm rio-bogota-container
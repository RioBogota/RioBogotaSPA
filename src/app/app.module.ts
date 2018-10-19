import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppModuleShared } from './app.shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppModuleShared
  ],
  providers: [{ provide: 'BASE_URL', useFactory: getBaseUrl }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return 'http://localhost:64513/';
}

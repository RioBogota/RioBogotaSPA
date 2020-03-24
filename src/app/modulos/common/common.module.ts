import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwitchComponent } from 'src/app/shared/switch/switch.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SwitchComponent],
  exports: [SwitchComponent]
})
export class CommonRioBogModule { }

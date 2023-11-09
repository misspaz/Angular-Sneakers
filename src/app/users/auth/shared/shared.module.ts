import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitLongTextPipe } from './limit-long-text-pipe';

@NgModule({
  declarations: [
    LimitLongTextPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LimitLongTextPipe
  ]
})
export class SharedModule { }

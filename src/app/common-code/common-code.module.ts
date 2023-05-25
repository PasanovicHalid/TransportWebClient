import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyPipe } from './pipes/empty-pipe';
import { FirstLetterLowercasePipe } from './pipes/first-letter-lowercase-pipe';



@NgModule({
  declarations: [
    EmptyPipe,
    FirstLetterLowercasePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmptyPipe,
    FirstLetterLowercasePipe
  ]
})
export class CommonCodeModule { }

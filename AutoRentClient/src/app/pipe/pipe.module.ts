import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from '../pipes/yes-no.pipe';
import { BranchPipe } from '../pipes/branch.pipe';



@NgModule({
  declarations: [YesNoPipe, BranchPipe],
  exports: [YesNoPipe, BranchPipe],
  imports: [
    CommonModule
  ]
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}

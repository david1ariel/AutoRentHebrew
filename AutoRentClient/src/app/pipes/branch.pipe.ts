import { Pipe, PipeTransform } from '@angular/core';
import { BranchModel } from '../models/branch.model';

@Pipe({
  name: 'branch'
})
export class BranchPipe implements PipeTransform {

  transform(value: number, branches: BranchModel[]): string {
    if(value===0 || branches.find(p=>p.branchId===value)===undefined)
      return '';
    return branches.find(p=>p.branchId===value).name
  }
}

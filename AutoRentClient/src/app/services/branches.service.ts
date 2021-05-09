import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BranchModel } from '../models/branch.model';
import { Action } from '../redux/action';
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(private http: HttpClient) { }

  public async getAllBranches(): Promise<boolean> {
    try {
      const branches: BranchModel[] = await this.http.get<BranchModel[]>(environment.branchesBaseUrl).toPromise();
      console.log(branches);
      store.dispatch({ type: ActionType.GetAllBranches, payload: branches });
      return true;
    }
    catch (httpErrorResponse) {
      console.log(httpErrorResponse);
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      return false;
    }
  }

  public async updateBranch(branchToUpdate: BranchModel): Promise<boolean>{
    try{
      const branchModel = this.http.put(environment.branchesBaseUrl + "/" + branchToUpdate.branchId, branchToUpdate).toPromise();
      store.dispatch({ type: ActionType.UpdateFullBranch, payload: branchModel});
      return true;
    }
    catch (httpErrorResponse){
      console.log(httpErrorResponse);
      return false;
    }

  }

  public AddBranch(branchToAdd: BranchModel): Promise<void>{
    return new Promise<void>((resolve, reject) => {
      this.http.post<BranchModel>(environment.branchesBaseUrl, branchToAdd)
      .subscribe(branchModel => {
        const action: Action =  { type: ActionType.AddBranch, payload: branchModel};
        store.dispatch(action);
        resolve();
      }, err => {
        reject(err);
      });
    });
  }

  public deleteBranch(branchId: number): Promise<void>{
    // const reduxBranchId = branchId;
  return new Promise<void>((resolve, reject) => {
      this.http.delete(environment.branchesBaseUrl + '/' + branchId)
      .subscribe((branchId) => {
        const action: Action = {type: ActionType.DeleteBranch, payload: branchId};
        store.dispatch(action);
        resolve();
      }, err => {
        reject(err);
      });
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RentModel } from '../models/rent.model';
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class RentsService {

  constructor(private http: HttpClient) { }

  public async rentCar(rent: RentModel): Promise<boolean> {
    try {
      const rentAdded = await this.http.post<RentModel>(environment.rentsBaseUrl, rent).toPromise();
      console.log(rentAdded);
      store.dispatch({ type: ActionType.GetRentModelAdded, payload: rentAdded });
      return true;
    }
    catch (httpErrorResponse) {
      console.dir(httpErrorResponse);
      return false;
    }
  }

  public async getRentsByCarId(carId: string): Promise<boolean> {
    try {
      const rents = await this.http.get<RentModel[]>(environment.rentsBaseUrl + "/" + carId).toPromise();
      store.dispatch({ type: ActionType.GetRentsByCarId, payload: rents });
      console.log(rents);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  public async getAllRents(): Promise<boolean> {
    try {
      const rents = await this.http.get<RentModel[]>(environment.rentsBaseUrl).toPromise();
      store.dispatch({ type: ActionType.GetAllRents, payload: rents });
      console.log(rents);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  public async getAllRentsOfUser(userId: string): Promise<boolean> {
    try {
      const rentOfUser = await this.http.get<RentModel[]>(environment.rentsBaseUrl + "/" + userId + "/user-rents").toPromise();
      store.dispatch({ type: ActionType.GetRentsOfUser, payload: rentOfUser });
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }

  }

  public async getCurrentRentOfCarId(carId: string): Promise<boolean> {
    try {
      console.log('enter')
      const currentRent = await this.http.get<RentModel>(environment.rentsBaseUrl + "/" + carId + "/current").toPromise();
      store.dispatch({ type: ActionType.GetCurrentRent, payload: currentRent });
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  public async returnCar(rent: RentModel): Promise<boolean> {
    try {
      await this.http.patch<RentModel>(environment.rentsBaseUrl + "/" + rent.rentId, rent).toPromise();
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  public async addRent(rent: RentModel): Promise<boolean> {
    try {
      const rentAdded = await this.http.post<RentModel>(environment.rentsBaseUrl, rent).toPromise();
      store.dispatch({ type: ActionType.AddRent, payload: rentAdded });
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  public async updateRent(rentId: number, rentToAdd: RentModel): Promise<boolean> {
    try {
      const rentupdated = await this.http.put<RentModel>(environment.rentsBaseUrl + "/" + rentId, rentToAdd).toPromise();
      store.dispatch({ type: ActionType.UpdateRent, payload: rentupdated });
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  public async deleteRent(rentId: number): Promise<boolean> {
    try {
      await this.http.delete(environment.rentsBaseUrl + "/" + rentId).toPromise();
      store.dispatch({ type: ActionType.DeleteRent, payload: rentId });
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}

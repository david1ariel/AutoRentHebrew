import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { store } from '../redux/store';
import { ActionType } from '../redux/action-type';
import { CarModel } from '../models/car.model';
import { RentModel } from '../models/rent.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  public async getAllCars(): Promise<boolean> {
    try {
      const cars: CarModel[] = await this.http.get<CarModel[]>(environment.carsBaseUrl).toPromise();
      console.log(cars);
      store.dispatch({ type: ActionType.GetAllCars, payload: cars });
      return true;
    }
    catch (httpErrorResponse) {
      console.dir(httpErrorResponse);
      return false;
    }
  }

  public async getAllAvailableCars(rent: RentModel): Promise<boolean> {
    try {
      const availableCars: CarModel[] = await this.http.post<CarModel[]>(environment.carsBaseUrl + "/available", rent).toPromise();
      console.log(availableCars);
      store.dispatch({ type: ActionType.GetAllAvailableCars, payload: availableCars });
      return true;
    }
    catch (httpErrorResponse) {
      console.dir(httpErrorResponse);
      return false;
    }
  }

  public async getSingleCar(carId: string): Promise<CarModel> {
    try {
      const car: CarModel = await this.http.get<CarModel>(environment.carsBaseUrl + "/" + carId).toPromise();
      console.log(car);
      return car;
    }
    catch (httpErrorResponse) {
      console.dir(httpErrorResponse);
    }
  }

  public async getCarsByCarType(carTypeId: number): Promise<boolean> {
    try {
      const cars: CarModel[] = await this.http.get<CarModel[]>(environment.carsBaseUrl + "/by-cartype/" + carTypeId).toPromise();
      console.log(cars);
      store.dispatch({ type: ActionType.GetCarsByCarType, payload: cars });
      return true;
    }
    catch (error) {
      console.log(error.message);
    }
  }

  public AddCar(carToAdd: CarModel): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post<CarModel>(environment.carsBaseUrl, carToAdd)
        .subscribe(carToAdd => {
          store.dispatch({ type: ActionType.AddCar, payload: carToAdd });
          resolve();
        }, err => {
          reject(err);
        });
    });
  }

  public async updateCar(car: CarModel): Promise<boolean> {
    try {
      const carUpdated = this.http.put(environment.carsBaseUrl + "/" + car.carId, car).toPromise();
      store.dispatch({ type: ActionType.UpdateFullCar, payload: carUpdated });
      return true;
    }
    catch (error) {
      console.log(error.message);
    }
  }

  

}

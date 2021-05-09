import { HttpClient } from '@angular/common/http';
import { CarTypeModel } from './../models/carType.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { store } from '../redux/store';
import { ActionType } from '../redux/action-type';
import { RentModel } from '../models/rent.model';

@Injectable({
    providedIn: 'root'
})
export class CarTypesService {

    constructor(private http: HttpClient) { }

    public async getAllCarTypes(): Promise<boolean> {
        try {
            const carTypes: CarTypeModel[] = await this.http.get<CarTypeModel[]>(environment.cartypesBaseUrl).toPromise();
            console.log(carTypes);
            store.dispatch({ type: ActionType.GetAllCarTypes, payload: carTypes });
            return true;
        }
        catch (httpErrorResponse) {
            console.dir(httpErrorResponse);
            return false;
        }
    }

    public async getAllAvailableCarTypes(rent: RentModel): Promise<boolean> {
        try {
            const carTypes: CarTypeModel[] = await this.http.post<CarTypeModel[]>(environment.cartypesBaseUrl +"/available", rent).toPromise();
            console.dir(carTypes);
            store.dispatch({ type: ActionType.GetAllAvailableCarTypes, payload: carTypes });
            return true;
        }
        catch (httpErrorResponse) {
            console.log(httpErrorResponse);
            return false;
        }
    }

    public async UpdateCarType(carType:CarTypeModel): Promise<boolean> {
        try {
            const formData = new FormData();
            formData.append("carTypeId", carType.carTypeId.toString());
            formData.append("manufacturer", carType.manufacturer);
            formData.append("model", carType.model);
            formData.append("pricePerDay", carType.pricePerDay.toString());
            formData.append("pricePerDayLate", carType.pricePerDayLate.toString());
            formData.append("year", carType.year.toString());
            formData.append("gear", carType.gear);
            if(carType.image)
                formData.append("image", carType.image, carType.image.name);

            const carTypeModel = await this.http.put<CarTypeModel>(environment.cartypesBaseUrl+"/"+carType.carTypeId, formData).toPromise();
            console.log(carTypeModel);
            store.dispatch({ type: ActionType.UpdateFullCarType, payload: carTypeModel });
            console.log("Update succeeded!");
            return true;
        }
        catch (httpErrorResponse) {
            console.log(httpErrorResponse);
            return false;
        }
    }

    public async AddNewCarType(carType:CarTypeModel): Promise<boolean> {
        try {
            const formData = new FormData();
            formData.append("manufacturer", carType.manufacturer);
            formData.append("model", carType.model);
            formData.append("pricePerDay", carType.pricePerDay.toString());
            formData.append("pricePerDayLate", carType.pricePerDayLate.toString());
            formData.append("year", carType.year.toString());
            formData.append("gear", carType.gear);
            if(carType.image)
                formData.append("image", carType.image, carType.image.name);
            if(carType.imageFileName)
                formData.append("imageFileName", carType.imageFileName);
            const carTypeModel = await this.http.post<CarTypeModel>(environment.cartypesBaseUrl, formData).toPromise();
            console.log(carTypeModel);
            store.dispatch({ type: ActionType.AddCarType, payload: carTypeModel });
            alert("adding succeeded!");
            return true;
        }
        catch (httpErrorResponse) {
            console.log(httpErrorResponse);
            return false;
        }
    }

}

import { HomeModel } from 'src/app/models/home.model';
import { ActionType } from 'src/app/redux/action-type';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { store } from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    public constructor(private http: HttpClient) { }

    public async getHomeData(): Promise<boolean> {
        try {
            const homeData: HomeModel = await this.http.get<HomeModel>(environment.homeBaseUrl).toPromise();
            console.log(homeData);
            store.dispatch({ type: ActionType.GetHomeData, payload: homeData });
            return true;
        }
        catch (httpErrorResponse) {
            console.log(httpErrorResponse);
            return false;
        }
    }

    public async UpdateHomeData(home:HomeModel): Promise<boolean> {
        try {
            const formData = new FormData();

            formData.append("mailingAdress", home.mailingAdress);
            formData.append("sundayToThursdayOpenHour", home.sundayToThursdayOpenHour);
            formData.append("sundayToThursdayCloseHour", home.sundayToThursdayCloseHour);
            formData.append("fridayOpenHour", home.fridayOpenHour);
            formData.append("fridayCloseHour", home.fridayCloseHour);
            formData.append("phone", home.phone);
            formData.append("fax", home.fax);
            formData.append("backgroundImage", home.backgroundImage, home.backgroundImage?.name);

            const homeData = await this.http.patch<HomeModel>(environment.homeBaseUrl, formData).toPromise();
            store.dispatch({ type: ActionType.UpdateHomeData, payload: homeData });
            return true;
        }
        catch (httpErrorResponse) {
            console.log(httpErrorResponse);
            return false;
        }
    }
}

import { store } from './../redux/store';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionType } from '../redux/action-type';
import { UserModel } from '../models/user.model';
import { CredentialsModel } from '../models/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public async register(user: UserModel): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append("userId", user.userId);
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("gender", user.gender);
      formData.append("email", user.email);
      formData.append("username", user.username);
      formData.append("password", user.password);
      if (user.birthDate)
        formData.append("birthDate", user.birthDate?.toString());
      if (user.image)
        formData.append("image", user.image, user.image.name);
      if (user.country)
        formData.append("country", user.country);
      if(user.city && !user.country)
        formData.append("country", "Israel");
      if (user.city)
        formData.append("city", user.city);
      if (user.adressLine)
        formData.append("adressLine", user.adressLine);
      if (user.postalZipCode)
        formData.append("postalZipCode", user.postalZipCode);

      const registeredUser = await this.http.post<UserModel>(environment.authBaseUrl + "/register", formData).toPromise();
      store.dispatch({ type: ActionType.Register, payload: registeredUser });
      return true;
    }
    catch (httpErrorResponse) {
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      return false;
    }
  }

  public async login(credentials: CredentialsModel): Promise<boolean> {
    try {
      const loggedInUser = await this.http.post<UserModel>(environment.authBaseUrl + "/login", credentials).toPromise();
      store.dispatch({ type: ActionType.Login, payload: loggedInUser });
      return true;
    }
    catch (httpErrorResponse) {
      store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
      return false;
    }
  }

  public logout(): void {
    store.dispatch({ type: ActionType.Logout });
  }
}

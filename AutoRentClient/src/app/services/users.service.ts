import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public async getAllUsers(): Promise<boolean> {
    try {
      const users = await this.http.get<UserModel[]>(environment.usersBaseUrl).toPromise();
      store.dispatch({ type: ActionType.GetAllUsers, payload: users });
      return true;
    }
    catch (httpErrorResponse) {
      console.dir(httpErrorResponse);
      return false;
    }
  }
  

  public async addUser(userToAdd: UserModel): Promise<boolean> {
    try {

      const formData = new FormData();
      formData.append("userId", userToAdd.userId);
      formData.append("firstName", userToAdd.firstName);
      formData.append("lastName", userToAdd.lastName);
      formData.append("gender", userToAdd.gender);
      formData.append("email", userToAdd.email);
      formData.append("username", userToAdd.username);
      formData.append("password", userToAdd.password);
      if(userToAdd.image)
        formData.append("image", userToAdd.image, userToAdd.image.name);
      if (userToAdd.birthDate)
        formData.append("birthDate", userToAdd.birthDate?.toString());
      if (userToAdd.country)
        formData.append("country", userToAdd.country);
      if (userToAdd.city)
        formData.append("city", userToAdd.city);
      if (userToAdd.adressLine)
        formData.append("adressLine", userToAdd.adressLine);
      if (userToAdd.postalZipCode)
        formData.append("postalZipCode", userToAdd.postalZipCode);

      const addedUser = await this.http.post<UserModel>(environment.usersBaseUrl, formData).toPromise();
      store.dispatch({ type: ActionType.AddUser, payload: addedUser });
      return true;
    }
    catch (httpErrorResponse) {
      console.dir(httpErrorResponse);
      return false;
    }
  }

  public async updateUser(userToUpdate: UserModel): Promise<boolean> {
    try {

      const formData = new FormData();
      formData.append("userId", userToUpdate.userId);
      formData.append("firstName", userToUpdate.firstName);
      formData.append("lastName", userToUpdate.lastName);
      formData.append("gender", userToUpdate.gender);
      formData.append("email", userToUpdate.email);
      formData.append("username", userToUpdate.username);
      formData.append("password", userToUpdate.password);
      if(userToUpdate.image)
        formData.append("image", userToUpdate.image, userToUpdate.image.name);
      if (userToUpdate.birthDate)
        formData.append("birthDate", userToUpdate.birthDate?.toString());
      if (userToUpdate.country)
        formData.append("country", userToUpdate.country);
      if (userToUpdate.city)
        formData.append("city", userToUpdate.city);
      if (userToUpdate.adressLine)
        formData.append("adressLine", userToUpdate.adressLine);
      if (userToUpdate.postalZipCode)
        formData.append("postalZipCode", userToUpdate.postalZipCode);

        const updatedUser = await this.http.put<UserModel>(environment.usersBaseUrl + "/" + userToUpdate.userId, formData).toPromise();
        store.dispatch({ type: ActionType.UpdateUser, payload: updatedUser });
        return true;
    }
    catch (httpErrorResponse) {
      console.dir(httpErrorResponse);
      return false;
    }
  }

  public async DeleteUser(userToDeleteId: string): Promise<boolean> {
    try {
      await this.http.delete<UserModel>(environment.usersBaseUrl + "/" + userToDeleteId).toPromise();
      store.dispatch({ type: ActionType.DeleteUser, payload: userToDeleteId });
      return true;
    }
    catch (httpErrorResponse) {
      console.dir(httpErrorResponse);
      return false;
    }
  }

  public async getRentingClient(rentId: number): Promise<boolean>{
    try {
      const rentingClient = await this.http.get<UserModel>(environment.usersBaseUrl + "/renting-client/" + rentId).toPromise();
      store.dispatch({ type: ActionType.GetRentingClient, payload: rentingClient });
      return true;
    }
    catch (httpErrorResponse) {
      console.dir(httpErrorResponse);
      return false;
    }
  }
}

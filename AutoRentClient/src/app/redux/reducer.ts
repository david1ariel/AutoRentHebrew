import { environment } from 'src/environments/environment';
import { AppState } from './app-state';
import { Action } from './action';
import { ActionType } from './action-type';
import { Notyf } from 'notyf';



const notify = new Notyf();

export function reducer(currentState: AppState, action: Action): AppState {

  const newState = { ...currentState }; // Spread Operator

  switch (action.type) {

    case ActionType.Register:
    case ActionType.Login: {
      newState.user = action.payload;
      if (newState.user)
        sessionStorage.setItem("user", JSON.stringify(newState.user));
      break;
    }

    case ActionType.Logout: {
      newState.user = null;
      sessionStorage.removeItem("user");
      break;
    }

    case ActionType.GetHomeData: {
      newState.home = action.payload;
      newState.home.backgroundImageFileName = environment.imagesBaseUrl + "/" + newState.home.backgroundImageFileName;
      break;
    }

    case ActionType.UpdateHomeData: {
      action.payload.backgroundImageFileName = environment.imagesBaseUrl + "/" + action.payload.backgroundImgaeFileName;
      newState.home = action.payload;
      break;
    }

    case ActionType.GetAllCars: {
      newState.cars = action.payload;
      break;
    }

    case ActionType.GetRentToReturn: {
      newState.rentToReturn = action.payload;
      break;
    }

    case ActionType.AddCar: {
      newState.cars.push(action.payload);
      break;
    }

    case ActionType.UpdateFullCar: {
      const index = newState.cars.findIndex(p => p.carId === action.payload.carId);
      newState.cars[index] = action.payload;
      break;
    }

    case ActionType.DeleteCar: {
      const index = newState.cars.findIndex(p => p.carId === action.payload);
      newState.cars.splice(index, 1);
      break;
    }

    case ActionType.GetAllCarTypes: {
      for (let c of action.payload) {
        c.imageFileName = environment.imagesBaseUrl + "/" + c.imageFileName;
      }
      newState.carTypes = action.payload;
      break;
    }

    case ActionType.GetAllAvailableCarTypes: {
      for (let c of action.payload) {
        c.imageFileName = environment.imagesBaseUrl + "/" + c.imageFileName;
      }
      newState.availableCarTypes = action.payload;
      break;
    }

    case ActionType.GetAllAvailableCars: {
      newState.availableCars = action.payload;
      break;
    }

    case ActionType.UpdateFullCarType: {
      action.payload.imageFileName = environment.imagesBaseUrl + "/" + action.payload.imgaeFileName;
      const index = newState.carTypes.findIndex(p => p.carTypeId === action.payload.carTypeId);
      newState.carTypes[index] = action.payload;
      break;
    }

    case ActionType.AddCarType: {
      action.payload.imageFileName = environment.imagesBaseUrl + "/" + action.payload.imgaeFileName;
      newState.carTypes.push(action.payload);
      break;
    }

    case ActionType.DeleteCarType: {
      const index = newState.carTypes.findIndex(p => p.carTypeId === action.payload);
      newState.carTypes.splice(index, 1);
      break;
    }

    case ActionType.GetAllBranches: {
      newState.branches = action.payload;
      break;
    }

    case ActionType.AddBranch: {
      newState.branches.push(action.payload);
      break;
    }

    case ActionType.UpdateFullBranch: {
      const index = newState.branches.findIndex(p => p.branchId === action.payload.branchId);
      newState.branches[index] = action.payload;
      break;
    }

    case ActionType.DeleteBranch: {
      const index = newState.branches.findIndex(p => p.branchId === action.payload);
      newState.branches.splice(index, 1);
      break;
    }

    case ActionType.GetRentModelAdded: {
      newState.rentAdded = action.payload;
      break;
    }

    case ActionType.GetCarsByCarType: {
      newState.carsByCarType = action.payload;
      break;

    }

    case ActionType.GotError: {
      newState.lastError = getErrorMessage(action.payload);
      notify.error(newState.lastError);
      break;
    }

    case ActionType.GetBooksModel: {
      newState.books = action.payload;
      break;
    }

    case ActionType.GetAllRents: {
      newState.rents = action.payload;
      break;
    }

    case ActionType.AddRent: {
      newState.rents.push(action.payload);
      break;
    }

    case ActionType.UpdateRent: {
      const index = newState.rents.findIndex(p => p.rentId === action.payload.rentId);
      newState.rents[index] = action.payload;
      break;
    }

    case ActionType.DeleteBranch: {
      const index = newState.rents.findIndex(p => p.rentId === action.payload);
      newState.rents.splice(index, 1);
      break;
    }

    case ActionType.GetRentsByCarId: {
      newState.rentsByCarId = action.payload;
      break;
    }

    case ActionType.GetCurrentRent: {
      newState.currentRent = action.payload;
      break;
    }

    case ActionType.GetAllUsers:{
      for (let u of action.payload) {
        u.imageFileName = environment.imagesBaseUrl + "/" + u.imageFileName;
      }
      newState.users = action.payload;
      break;
    }



    case ActionType.DeleteUser: {
      const index = newState.users.findIndex(p => p.userId === action.payload);
      newState.users.splice(index, 1);
      break;
    }

    case ActionType.AddUser: {
      newState.users.push(action.payload);
      break;
    }

    case ActionType.UpdateUser: {
      const index = newState.users.findIndex(p => p.userId === action.payload.userId);
      newState.users[index] = action.payload;
      break;
    }

    case ActionType.GetRentingClient:{
      newState.rentingClient = action.payload;
      break;
    }

    case ActionType.GetRentsOfUser:{
      newState.rentsOfUser = action.payload;
      break;
    }

    case ActionType.DetermineWidth:{
      newState.windowWidth = action.payload;
      break;
    }

    case ActionType.ToggleMenu:{
      newState.isShowMenu = action.payload;
    }
  }

  return newState;
}

function getErrorMessage(errorObject) {
  console.log(errorObject);
  if (typeof errorObject.error === "string") {
    return errorObject.error;
  }

  if (errorObject.status === 401 || errorObject.status === 403) {
    return "You are not authorized";
  }

  if (errorObject.status === 400) {
    return "Incorrect input,<br> please try again";
  }

  return "Some error occurred, please try again later";
}

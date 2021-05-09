import { BooksModel } from '../models/books.modes';
import { BranchModel } from '../models/branch.model';
import { CarModel } from '../models/car.model';
import { RentModel } from '../models/rent.model';
import { UserModel } from '../models/user.model';
import { CarTypeModel } from './../models/carType.model';
import { HomeModel } from './../models/home.model';

export class AppState {

    public home: HomeModel;
    public isMenu: boolean;
    public isManagerSubMenu: boolean;
    public cars: CarModel[] = [];
    public carTypes: CarTypeModel[] = [];
    public carsByCarType: CarModel[] = [];
    public availableCarTypes: CarTypeModel[] = [];
    public availableCars: CarModel[] = [];
    public branches: BranchModel[] = [];
    public rentAdded: RentModel;
    public user: UserModel;
    public lastError: string;
    public books: BooksModel;
    public rentsByCarId: RentModel[] = [];
    public rents: RentModel[] = [];
    public currentRent: RentModel;
    public rentToReturn: RentModel;
    public users: UserModel[] = [];
    public rentingClient: UserModel;
    public rentsOfUser: RentModel[] = [];
    public windowWidth: number;
    public isShowMenu: boolean;


    public constructor() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      this.home = new HomeModel();
      this.rentAdded = new RentModel();
      this.currentRent= new RentModel();
      this.isShowMenu = false;
    }





}

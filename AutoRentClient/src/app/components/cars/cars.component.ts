import { CarTypesService } from './../../services/car-types.service';
import { Unsubscribe } from 'redux';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { store } from 'src/app/redux/store';
import { CarTypeModel } from 'src/app/models/carType.model';
import { Router } from '@angular/router';
import { CarModel } from 'src/app/models/car.model';
import { CarsService } from 'src/app/services/cars.service';
import { RentModel } from 'src/app/models/rent.model';
import { UserModel } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { RentsService } from 'src/app/services/rents.service';
import { BranchModel } from 'src/app/models/branch.model';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, OnDestroy {

  public carTypes: CarTypeModel[] = store.getState().carTypes;
  public availableCarTypes: CarTypeModel[] = store.getState().availableCarTypes;
  public availableCars: CarModel[] = store.getState().availableCars;
  public user: UserModel = store.getState().user;
  public carsToShow: CarTypeModel[] = [];
  public cars: CarModel[] = store.getState().cars;
  public unsubscribe: Unsubscribe;
  public yearFilter: number[];
  public manufacturerFilter: string[];
  public modelFilter: string[];
  public branchFilter: string[];
  public searchStr: string;
  public available: boolean;
  public pickupDateString: string;
  public returnDateString: string;
  public localStorageCarTypes: CarTypeModel[] = [];
  public fullCarDisplay: boolean = false;
  public rent: RentModel = new RentModel();
  public chosenBranchId: number;
  public chosenCarType: CarTypeModel = new CarTypeModel();
  public localDialogRef;
  public preview: string;
  public carToRent: CarModel;
  public isCarExistInBranch: number = 0;
  public windowWidth = window.innerWidth;
  public isShowFilters = false;
  public price: number;

  constructor(
    private carTypesService: CarTypesService,
    private router: Router,
    private carsService: CarsService,
    private rentsService: RentsService,
    private dialog: MatDialog) { }


  async ngOnInit() {
    try {
      this.unsubscribe = store.subscribe(() => {
        this.carTypes = store.getState().carTypes;
        this.cars = store.getState().cars;
        this.availableCars = store.getState().availableCars;
        this.user = store.getState().user;
        this.price = this.calcPrice();
      });

      if (store.getState().carTypes.length) {
        this.carTypes = store.getState().carTypes;
      }
      else {
        await this.carTypesService.getAllCarTypes();
      }

      if (store.getState().cars.length) {
        this.cars = store.getState().cars;
      }
      else {
        await this.carsService.getAllCars();
      }

      if (store.getState().availableCars.length) {
        this.availableCars = store.getState().availableCars;
      }
      else {
        await this.carsService.getAllAvailableCars(this.rent);
      }

      this.carsToShow = this.carTypes;
      this.initManufacturerFilter();
      this.initYearFilter();
      this.initBranchFilter();

      this.carsToShow = this.carTypes;

      this.rent.pickupDate = new Date();
      this.rent.returnDate = new Date();

      if (localStorage.getItem("carTypes") !== null)
        this.localStorageCarTypes = JSON.parse(localStorage.getItem("carTypes"));

      console.log(window.innerWidth);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  public onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  changePickupDateToNow() {
    if (this.pickupDateString === undefined) {
      const date = new Date();
      date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
      this.pickupDateString = date.toISOString().slice(0, 10);
      this.rent.pickupDate = new Date(this.pickupDateString);
    }
  }
  changeReturnDateToNow() {
    if (this.returnDateString === undefined) {
      const date = new Date();
      date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
      this.returnDateString = date.toISOString().slice(0, 10);
      this.rent.returnDate = new Date(this.returnDateString);
    }
  }

  toggleFilters() {
    this.isShowFilters = !this.isShowFilters;
  }

  initYearFilter() {
    const yearNotFiltered: number[] = [];
    for (let c of this.carTypes)
      yearNotFiltered.push(c.year);
    this.yearFilter = yearNotFiltered.filter(this.onlyUnique);
  }

  initManufacturerFilter() {
    const manufacturerNotFiltered: string[] = [];
    for (let c of this.carTypes)
      manufacturerNotFiltered.push(c.manufacturer);
    this.manufacturerFilter = manufacturerNotFiltered.filter(this.onlyUnique);
  }

  initBranchFilter() {
    const branchNotFiltered: string[] = [];
    for (let c of this.cars)
      branchNotFiltered.push(c.branch);
    this.branchFilter = branchNotFiltered.filter(this.onlyUnique);
  }

  selectedGear(event) {
    this.carsToShow = this.carTypes.filter(p => p.gear === event.target.value);
  }

  filterByManufacturer(event) {
    this.carsToShow = this.carTypes.filter(p => p.manufacturer === event.target.value);
  }

  filterByModel(event) {
    this.carsToShow = this.carTypes.filter(p => p.model === event.target.value);
  }

  filterByYear(event) {
    if (event.target.value !== '') {
      this.carsToShow = this.carTypes.filter(p => p.year === +event.target.value);
    }
  }

  filterByBranch(event) {
    if (event.target.value === 'allBranches') {
      this.carsToShow = store.getState().carTypes;
      return;
    }

    if (event.target.value !== '') {
      this.chosenBranchId = this.branchFilter.findIndex(p => p === event.target.value);
      const carsByBranch = [];
      this.carsToShow = [];
      for (const car of this.cars) {
        if (car.branch === event.target.value) {
          carsByBranch.push(car);
        }
      }
      for (const car of carsByBranch) {
        this.carsToShow.push(this.carTypes.find(p => p.carTypeId === car.carTypeId));
      }
      this.carsToShow = this.carsToShow.filter(this.onlyUnique);
    }
  }

  search() {
    this.carsToShow = [];
    if (this.searchStr === '')
      this.carsToShow = this.carTypes;
    if (this.searchStr !== '') {
      for (let obj of this.carTypes) {
        for (let prop in obj) {
          let property: string = '';
          if (obj[prop] != null && obj[prop] != undefined)
            property = obj[prop].toString();
          if (property.toLocaleLowerCase().includes(this.searchStr.toLocaleLowerCase())) {
            this.carsToShow.push(obj);
            break;
          }
        }
      }
    }
  }

  async showAvailableCars() {


    const now = new Date();
    if (this.pickupDateString === "" || this.returnDateString === ""
      || this.pickupDateString === undefined || this.returnDateString === undefined) {
      alert('Both dates must be defined');

      return;
    }
    // if (new Date(this.pickupDateString).valueOf() < now.valueOf() - (1000 * 60 * 60 * 24)) {
    //   alert('Pickup date must from now on');
    //   // this.available = false;
    //   // event.stopPropagation();
    //   return;
    // }
    if (new Date(this.pickupDateString).valueOf() > new Date(this.returnDateString).valueOf()) {
      alert('Return date must be after pickup date');

      return;
    }
    this.available = !this.available;
    this.rent.pickupDate = new Date(this.pickupDateString);
    this.rent.returnDate = new Date(this.returnDateString);
    const success = await this.carTypesService.getAllAvailableCarTypes(this.rent);
    if (store.getState().availableCarTypes.length > 0)
      this.carsToShow = store.getState().availableCarTypes;
    // }
    // else {
    //   this.carsToShow = this.carTypes;
    // }
  }

  showAllCars() {
    this.available = !this.available;
    this.carsToShow = this.carTypes;
  }

  public async beginRent(carTypeId: number, confirmRentTemplateRef, loggedOutTemplateRef) {
    try {
      this.checkCarTypesByBranch(this.branchFilter[this.chosenBranchId]);
      // this.isCarExistInBranch = 0;
      // await this.carsService.getAllAvailableCars(this.rent);
      // await this.carTypesService.getAllAvailableCarTypes(this.rent);

      //handling the local storage carTypes array:
      if (localStorage.getItem("carTypes") === null) {
        if (this.localStorageCarTypes !== undefined) {
          const carTypeToCheck = this.localStorageCarTypes.find(p => p.carTypeId === carTypeId);
          if (carTypeToCheck === undefined) {
            this.localStorageCarTypes.push(this.carsToShow.find(p => p.carTypeId === carTypeId));
            localStorage.setItem("carTypes", JSON.stringify(this.localStorageCarTypes));
          }
        }
        else {
          this.localStorageCarTypes.push(this.carsToShow.find(p => p.carTypeId === carTypeId));
          localStorage.setItem("carTypes", JSON.stringify(this.localStorageCarTypes));
        }
      }
      else {
        const carTypeToCheck = this.localStorageCarTypes.find(p => p.carTypeId === carTypeId);
        if (carTypeToCheck === undefined) {
          this.localStorageCarTypes = JSON.parse(localStorage.getItem("carTypes"));
          this.localStorageCarTypes.push(this.carsToShow.find(p => p.carTypeId === carTypeId));
          localStorage.setItem("carTypes", JSON.stringify(this.localStorageCarTypes));
        }
      }

      // checking if user logged in:
      if (this.user) {
        this.chosenCarType = this.carsToShow.find(p => p.carTypeId === carTypeId);

        //handling the date inputs:
        if (this.pickupDateString === "") {
          const date = new Date();
          this.pickupDateString = date.toISOString().slice(0, 10);
        }
        if (this.returnDateString === "") {
          const date = new Date();
          this.returnDateString = date.toISOString().slice(0, 10);
        }
        if (this.rent.pickupDate === undefined) {
          this.changePickupDateToNow();
        }
        if (this.rent.returnDate === undefined) {
          this.changeReturnDateToNow();
        }

        // if user is logged in:
        this.openDialog(confirmRentTemplateRef);
      }

      //if user is not logge in:
      else {
        this.openDialog(loggedOutTemplateRef);
      }
    } catch (error) {
      console.log(error.message);
    }

  }

  checkCarTypesByBranchEvent(event) {
    this.checkCarTypesByBranch(event.target.value);
  }

  async checkCarTypesByBranch(string) {
    this.isCarExistInBranch = 0;
    await this.carsService.getAllAvailableCars(this.rent);
    console.log(this.availableCars);
    for (const car of this.availableCars) {
      if (car.carTypeId === this.chosenCarType.carTypeId && car.branch == string) {
        this.carToRent = car;
        this.rent.carId = car.carId;
        this.isCarExistInBranch = 1;
        return;
      }
    }
    this.isCarExistInBranch = -1;
  }

  async executeRent(receivedTemplateRef, errorTemplateRef) {
    try {
      this.rent.userId = this.user.userId;
      const success = await this.rentsService.rentCar(this.rent);
      this.dialog.closeAll();
      if (success)
        this.openDialog(receivedTemplateRef)
      else
        this.openDialog(errorTemplateRef)
    } catch (error) {
      alert('Something went terribly roung');
    }
  }

  async pickupDateChanged() {
    this.rent.pickupDate = new Date(this.pickupDateString);
    if (this.available) {
      await this.carTypesService.getAllAvailableCarTypes(this.rent);
      if (store.getState().availableCarTypes.length > 0)
        this.carsToShow = store.getState().availableCarTypes;
    }
    this.calcPrice();
  }

  async returnDateChanged() {
    this.rent.returnDate = new Date(this.returnDateString);
    if (this.available) {
      await this.carTypesService.getAllAvailableCarTypes(this.rent);
      if (store.getState().availableCarTypes.length > 0)
        this.carsToShow = store.getState().availableCarTypes;
    }
    this.calcPrice();
  }

  calcPrice(): number {
    return (((this.rent.returnDate?.valueOf() - this.rent.pickupDate?.valueOf()) / 1000 / 60 / 60 / 24) * this.chosenCarType.pricePerDay);
  }

  openDialog(templateRef) {
    this.localDialogRef = this.dialog.open(templateRef, {
      width: "fit-content",
      panelClass: 'custom-dialog-container',
    });
  }

  async onCloseDialog() {
    this.dialog.closeAll();
    // handling list of available car types:
    if (this.available) {
      const success = await this.carTypesService.getAllAvailableCarTypes(this.rent);
      if (success) {
        if (store.getState().availableCarTypes.length > 0)
          this.carsToShow = store.getState().availableCarTypes;
        else
          this.carsToShow = [];
      }
    }
  }

  enableFullCarTypeDisplay(c: CarTypeModel, templateRef) {
    this.chosenCarType = c;
    this.dialog.closeAll();
    this.openDialog(templateRef);
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}

// async showAvail() {
  //   console.log(this.available);
  //   if (this.available === true) {
  //     const rent: RentModel = new RentModel();
  //     rent.pickupDate = new Date(Date.now());
  //     rent.returnDate = new Date(Date.now());
  //     rent.returnDate = new Date(rent.returnDate.getTime() + (1000 * 60 * 60 * 24));
  //     await this.carTypesService.getAllAvailableCarTypes(rent);
  //     this.carsToShow = store.getState().availableCars;
  //   }
  //   else {
  //     this.carsToShow = this.carTypes;
  //   }
  // }

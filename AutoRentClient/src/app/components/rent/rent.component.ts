import { Unsubscribe } from 'redux';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { store } from 'src/app/redux/store';
import { CarTypeModel } from 'src/app/models/carType.model';
import { CarTypesService } from 'src/app/services/car-types.service';
import { AvailabilityModel } from 'src/app/models/availability.model';
import { CarModel } from 'src/app/models/car.model';
import { CarsService } from 'src/app/services/cars.service';
import { RentModel } from 'src/app/models/rent.model';
import { UserModel } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { RentsService } from 'src/app/services/rents.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],

})
export class RentComponent implements OnInit, OnDestroy {

  public home = store.getState().home;
  public pickupDateString: string;
  public returnDateString: string;
  public availableCars: CarTypeModel[];
  public unsubscribe: Unsubscribe;
  public confirmed = false;
  public carRented = new CarModel();
  public user: UserModel = store.getState().user;
  public rent: RentModel = new RentModel();
  public chosenCarType: CarTypeModel = new CarTypeModel();
  public localConfirmRentDialogRef;
  public localStorageCarTypes: CarTypeModel[] = [];
  public fullCarDisplay: boolean = false;

  constructor(
    private carTypesService: CarTypesService,
    private carsService: CarsService,
    private rentsService: RentsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.unsubscribe = store.subscribe(() => this.home = store.getState().home);
    this.unsubscribe = store.subscribe(() => this.user = store.getState().user);

    if (localStorage.getItem("carTypes") !== null)
      this.localStorageCarTypes = JSON.parse(localStorage.getItem("carTypes"));


    try {
      this.unsubscribe = store.subscribe(() => this.availableCars = store.getState().availableCars);
      if (store.getState().availableCars.length === 0) {
        this.carTypesService.getAllAvailableCarTypes(this.rent);

      }
    }
    catch (error) {
      console.log(error.message);
    }
  }

  changeDateToNow() {
    const date = new Date();
    date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
    this.pickupDateString = date.toISOString().slice(0, 10);
    this.returnDateString = date.toISOString().slice(0, 10);
  }

  async sendDates() {
    try {

      const now = new Date(Date.now());
      if (this.pickupDateString === "" || this.returnDateString === ""
        || this.pickupDateString === undefined || this.returnDateString === undefined
        || new Date(this.pickupDateString) < new Date(now.setDate(now.getHours() + 1))
        || new Date(this.pickupDateString) > new Date(this.returnDateString)) {
        alert("Dates must make sense!");
        return;
      }
      this.confirmed = true;
      console.log(this.confirmed);

      this.rent.pickupDate = new Date(this.pickupDateString);
      this.rent.returnDate = new Date(this.returnDateString);
      await this.carTypesService.getAllAvailableCarTypes(this.rent).then(() => {
        console.log(this.availableCars);
      });

    }
    catch (error) {
      console.log(error.message);
    }
  }

  public confirm(carTypeId: number, confirmRentTemplateRef, loggedOutTemplateRef) {
    if (localStorage.getItem("carTypes") === null) {
      if (this.localStorageCarTypes !== undefined) {
        const carTypeToCheck = this.localStorageCarTypes.find(p => p.carTypeId === carTypeId);
        if (carTypeToCheck === undefined) {
          this.localStorageCarTypes.push(this.availableCars.find(p => p.carTypeId === carTypeId));
          localStorage.setItem("carTypes", JSON.stringify(this.localStorageCarTypes));
        }
      }
      else {
        this.localStorageCarTypes.push(this.availableCars.find(p => p.carTypeId === carTypeId));
        localStorage.setItem("carTypes", JSON.stringify(this.localStorageCarTypes));
      }
    }
    else {
      const carTypeToCheck = this.localStorageCarTypes.find(p => p.carTypeId === carTypeId);
      if (carTypeToCheck === undefined) {
        this.localStorageCarTypes = JSON.parse(localStorage.getItem("carTypes"));
        this.localStorageCarTypes.push(this.availableCars.find(p => p.carTypeId === carTypeId));
        localStorage.setItem("carTypes", JSON.stringify(this.localStorageCarTypes));
      }
    }

    if (this.user) {
      this.chosenCarType = this.availableCars.find(p => p.carTypeId === carTypeId);
      this.openDialog(confirmRentTemplateRef);
    }
    else {
      this.openDialog(loggedOutTemplateRef);
    }
  }

  async Rent(carTypeId: number, receivedTemplateRef, errorTemplateRef) {
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

  openDialog(templateRef) {

    this.localConfirmRentDialogRef = this.dialog.open(templateRef, {
      width: "fit-content",
      panelClass: 'custom-dialog-container',
    });
  }

  onCloseDialog() {
    this.dialog.closeAll();
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

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unsubscribe } from 'redux';
import { CarModel } from 'src/app/models/car.model';
import { CarTypeModel } from 'src/app/models/carType.model';
import { RentModel } from 'src/app/models/rent.model';
import { UserModel } from 'src/app/models/user.model';
import { store } from 'src/app/redux/store';
import { CarTypesService } from 'src/app/services/car-types.service';
import { CarsService } from 'src/app/services/cars.service';
import { RentsService } from 'src/app/services/rents.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-return-car',
  templateUrl: './return-car.component.html',
  styleUrls: ['./return-car.component.css']
})
export class ReturnCarComponent implements OnInit {

  public user = store.getState().user;
  public currentRent = store.getState().currentRent;
  public unsubscribe: Unsubscribe;
  public carRented: CarModel;
  public carTypeRented: CarTypeModel;
  public carTypes: CarTypeModel[] = store.getState().carTypes;
  public isCarIdSent: boolean = false;
  public rentingClient: UserModel = store.getState().rentingClient;
  public stringPracticalReturnDate: string;
  public isCarIdInputHasValue: boolean = false;
  public localDialogRef;


  public carTypeToReturn: CarTypeModel;

  constructor(
    private carsService: CarsService,
    private carTypesService: CarTypesService,
    private usersService: UsersService,
    private rentsService: RentsService,
    private dialog: MatDialog) { }

  async ngOnInit() {
    try {
      this.unsubscribe = store.subscribe(() => this.user = store.getState().user);
      this.unsubscribe = store.subscribe(() => this.currentRent = store.getState().currentRent);
      this.unsubscribe = store.subscribe(() => this.rentingClient = store.getState().rentingClient);
      this.unsubscribe = store.subscribe(() => this.carTypes = store.getState().carTypes);
      if (store.getState().carTypes.length === 0)
        await this.carTypesService.getAllCarTypes();
      const date = new Date();
      this.stringPracticalReturnDate = date.toISOString().slice(0, 10);
    }
    catch (error) {
      console.log(error.message);
    }

  }

  public async getCurrentRentByCarId(carId: string) {
    if (carId.length === 0) {
      alert('Vehicle license number not entered!');
      return;
    }
    const success = await this.rentsService.getCurrentRentOfCarId(carId);
    if (success) {
      console.log(store.getState().currentRent);
      const success2 = await this.usersService.getRentingClient(this.currentRent.rentId);
      if (success2) {
        this.carRented = await this.carsService.getSingleCar(carId);
        if (this.carRented) {
          this.carTypeRented = this.carTypes.find(p => p.carTypeId === this.carRented.carTypeId);
          console.log(this.carTypeRented);
        }
      }
      this.isCarIdSent = true;
    }
    else{
      alert('No current rents found for this car.');
    }
  }

  practicalReturnDateChanged() {
    let now = new Date(this.stringPracticalReturnDate);
    now.setHours(now.getHours() - 2);
    this.currentRent.practicalReturnDate = now;
    this.calculate();
  }

  calculate() {
    console.log(this.currentRent.returnDate);
    console.log(this.currentRent.practicalReturnDate);
    this.currentRent.finalPayment = ((new Date(this.currentRent.returnDate).getTime() - new Date(this.currentRent.pickupDate).getTime()) / 1000 / 60 / 60 / 24) * this.carTypeRented.pricePerDay;
    // if client returned late
    if (new Date(this.currentRent.practicalReturnDate).getTime() > new Date(this.currentRent.returnDate).getTime()) {
      const costOfLate = ((new Date(this.currentRent.practicalReturnDate).getTime() - new Date(this.currentRent.returnDate).getTime()) / 1000 / 60 / 60 / 24) * this.carTypeRented.pricePerDayLate;
      this.currentRent.finalPayment = this.currentRent.finalPayment + costOfLate;
    }
    console.log(this.currentRent);
  }

  public async returnCar(receivedTemplateRef, errorTemplateRef) {
    let d = this.currentRent.practicalReturnDate;
    d.setHours(d.getHours() + 2);
    this.currentRent.practicalReturnDate = d;
    const success = await this.rentsService.returnCar(this.currentRent);
    if(success)
      this.openDialog(receivedTemplateRef);

    else
      this.openDialog(errorTemplateRef);
  }

  openDialog(templateRef) {
    this.localDialogRef = this.dialog.open(templateRef, {
      width: "fit-content",
      panelClass: 'custom-dialog-container',
    });
  }

  clearForm(){
    this.currentRent = new RentModel();
    this.carTypeToReturn = new CarTypeModel();
    this.isCarIdSent = false;
    
  }

  async onCloseDialog() {
    this.dialog.closeAll();
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Unsubscribe } from 'redux';
import { BooksModel } from 'src/app/models/books.modes';
import { RentModel } from 'src/app/models/rent.model';
import { UserModel } from 'src/app/models/user.model';
import { store } from 'src/app/redux/store';
import { CarsService } from 'src/app/services/cars.service';
import { RentsService } from 'src/app/services/rents.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-availabilities',
  templateUrl: './availabilities.component.html',
  styleUrls: ['./availabilities.component.css']
})
export class AvailabilitiesComponent implements OnInit {

  public rents: RentModel[] = store.getState().rentsByCarId;
  public books: BooksModel = store.getState().books;
  public users: UserModel[] = store.getState().users;
  public unsubscribe: Unsubscribe;
  public isOnlyOneCar: boolean;
  public returnDateString: string[] = [];
  public pickupDateString: string[] = [];
  public practicalReturnDateString: string[] = [];
  public localDialogRef;
  public rentToAdd: RentModel = new RentModel();
  public rentToAddReturnDateString: string;
  public rentToAddPickupDateString: string;
  public rentToAddPracticalReturnDateString: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rentsService: RentsService,
    private usersService: UsersService,
    private dialog: MatDialog) { }

  async ngOnInit() {
    const carTypeId = this.activatedRoute.snapshot.params.carTypeId;
    if (carTypeId !== undefined) {
      this.isOnlyOneCar = true;
      this.unsubscribe = store.subscribe(() => this.rents = store.getState().rentsByCarId);
      if (store.getState().rentsByCarId.length === 0) {
        await this.rentsService.getRentsByCarId(carTypeId);
        console.log(this.rents);
      }
    }
    else {
      this.isOnlyOneCar = false;
      this.unsubscribe = store.subscribe(() => this.rents = store.getState().rents);
      if (store.getState().rents.length === 0) {
        await this.rentsService.getAllRents();
        this.rents = store.getState().rents;
        console.log(this.rents);
      }
    }
    this.unsubscribe = store.subscribe(() => this.users = store.getState().users);
    if (store.getState().users.length === 0)
      await this.usersService.getAllUsers();
    for (let i = 0; i < this.rents.length; i++) {
      this.rents[i].clientFullName = this.users.find(p => p.userId === this.rents[i].userId).firstName
        + " " +
        this.users.find(p => p.userId === this.rents[i].userId).lastName;
      this.pickupDateString.push(new Date(this.rents[i].pickupDate).toISOString().slice(0, 10));
      this.returnDateString.push(new Date(this.rents[i].returnDate).toISOString().slice(0, 10));
      this.practicalReturnDateString.push(new Date(this.rents[i].practicalReturnDate).toISOString().slice(0, 10));
    }
    console.log(carTypeId);

  }

  userChanging() {
    alert('Users management is only in "users" section.');
  }

  pickupDateChanged(i) {
    this.rents[i].pickupDate = new Date(this.pickupDateString[i]);
  }

  returnDateChanged(i) {
    this.rents[i].returnDate = new Date(this.returnDateString[i]);
  }

  practicalReturnDateChanged(i: number) {
    this.rents[i].practicalReturnDate = new Date(this.practicalReturnDateString[i]);
  }

  async updateRent(r, receivedTemplateRef, errorTemplateRef) {
    const success = await this.rentsService.updateRent(r.rentId, r);
    if (success)
      this.openDialog(receivedTemplateRef);
    else
      this.openDialog(errorTemplateRef);
  }

  async deleteRent(r, receivedTemplateRef, errorTemplateRef) {
    const success = await this.rentsService.deleteRent(r.rentId);
    if (success)
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

  rentToAddPickupDateChanged(){
    this.rentToAdd.pickupDate = new Date(this.rentToAddPickupDateString);
  }

  rentToAddReturnDateChanged(){
    this.rentToAdd.returnDate = new Date(this.rentToAddReturnDateString);
  }

  rentToAddPracticalReturnDateChanged(){
    this.rentToAdd.practicalReturnDate = new Date(this.rentToAddPracticalReturnDateString);
  }

  async addRent(addedTemplateRef, errorTemplateRef){
    const success = this.rentsService.addRent(this.rentToAdd);
    if(success)
      this.openDialog(addedTemplateRef);
    else
      this.openDialog(errorTemplateRef);
  }

  clearAddedRent(){
    this.rentToAdd = new RentModel();
  }

  async onCloseDialog() {
    this.dialog.closeAll();
  }

}

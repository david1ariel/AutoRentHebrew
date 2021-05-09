import { WindowService } from './../../../services/window.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CarTypeModel } from 'src/app/models/carType.model';
import { store } from 'src/app/redux/store';
import { CarTypesService } from 'src/app/services/car-types.service';
import { CarModel } from 'src/app/models/car.model';
import { CarsService } from 'src/app/services/cars.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { BranchModel } from 'src/app/models/branch.model';
import { BranchesService } from 'src/app/services/branches.service';
import { BooksModel } from 'src/app/models/books.modes';
import { ActionType } from 'src/app/redux/action-type';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-car-types',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './car-types.component.html',
  styleUrls: ['./car-types.component.css']
})
export class CarTypesComponent implements OnInit, OnDestroy {

  public carTypes: CarTypeModel[] = store.getState().carTypes;
  public cars: CarModel[] = [];
  public branches: BranchModel[] = store.getState().branches;
  public tempCarTypesImagesAsStrings = new Array<string>();
  public carTypesImageChangedIds = new Array<number>();
  public tempCarTypesImages;
  public carTypeToAdd = new CarTypeModel();
  public carToAdd = new CarModel();
  public unsubscribe: Unsubscribe;
  public preview: string;
  public localTemplateRef;

  public index: number = 0;
  public lastIndex: number;
  public opened = false;

  indexedDB = this.windowService.windowRef.indexedDB;
  IDBTransaction = this.windowService.windowRef.IDBTransaction;
  dbVersion = 1;

  constructor(
    private carTypesService: CarTypesService,
    private router: Router,
    private windowService: WindowService,
    private carsService: CarsService,
    private branchesService: BranchesService,
    private dialog: MatDialog) { }

  async ngOnInit() {
    try {
      this.unsubscribe = store.subscribe(() => {
        this.carTypes = store.getState().carTypes;
        this.branches = store.getState().branches;
      });
      if (store.getState().carTypes.length === 0) {
        const success = await this.carTypesService.getAllCarTypes();
        if (success) {
          this.carTypes = store.getState().carTypes;
          this.tempCarTypesImages = new Array<File>(this.carTypes.length);
          for (let c of this.carTypes) {
            this.tempCarTypesImagesAsStrings.push(c.imageFileName);
          }
        }
      }
      if (store.getState().branches.length === 0) {
        await this.branchesService.getAllBranches();
      }
      this.index = -1;
    }
    catch (error) {
      console.log(error.message);
    }
  }

  public changeImage(image: File, i: number): void {
    this.carTypes[i].image = image;
    const fileReader = new FileReader();
    fileReader.onload = args => {
      this.tempCarTypesImagesAsStrings[i] = args.target.result.toString();
      this.tempCarTypesImages[i] = image;
      console.log(this.tempCarTypesImagesAsStrings[i]);
      console.log(this.tempCarTypesImages[i].name);
    };
    fileReader.readAsDataURL(image);
  }

  async UpdateCarType(carTypesIndex: number, succeededTemplateRef, failedTemplateRef) {
    try {
      console.log(this.carTypes[carTypesIndex]);
      if(this.carTypes[carTypesIndex].imageFileName!==this.tempCarTypesImagesAsStrings[carTypesIndex])
        this.carTypes[carTypesIndex].imageFileName!==this.tempCarTypesImagesAsStrings[carTypesIndex];
      await this.carTypesService.UpdateCarType(this.carTypes[carTypesIndex]);
      this.carTypes = store.getState().carTypes;
      this.openDialog(succeededTemplateRef);
    }
    catch (error) {
      console.log(error.message);
      this.openDialog(failedTemplateRef);
    }
  }

  async UpdateCar(car: CarModel, succeededTemplateRef, failedTemplateRef) {
    try {
      console.log(car);
      await this.carsService.updateCar(car);
      this.carTypes = store.getState().carTypes;
      this.openDialog(succeededTemplateRef);
    }
    catch (error) {
      console.log(error.message);
      this.openDialog(failedTemplateRef);
    }
  }

  public async cancelCarTypeEdit(i: number) {
    await this.carTypesService.getAllCarTypes();

  }



  public displayNewCarPreview(image: File): void {
    this.carTypeToAdd.image = image;
    const fileReader = new FileReader();
    fileReader.onload = args => this.preview = args.target.result.toString();
    fileReader.readAsDataURL(image);
  }

  async addNewCarType(succeededTemplateRef, failedTemplateRef) {
    try {
      await this.carTypesService.AddNewCarType(this.carTypeToAdd);
      this.carTypes = store.getState().carTypes;
      this.openDialog(succeededTemplateRef);
    }
    catch (error) {
      console.log(error.message);
      this.openDialog(failedTemplateRef);
    }
  }

  async addNewCar(c: CarTypeModel, succeededTemplateRef, failedTemplateRef) {
    if (
      this.carToAdd.carId == "" ||
      this.carToAdd.branch == "") {
      alert("All fields are required");
      return;
    }
    try {
      this.carToAdd.carTypeId = c.carTypeId;
      await this.carsService.AddCar(this.carToAdd);
      await this.carsService.getCarsByCarType(c.carTypeId);
      this.cars = store.getState().carsByCarType;
      this.openDialog(succeededTemplateRef);
      this.carToAdd = new CarModel();
    }
    catch (error) {
      console.log(error.message);
      this.openDialog(failedTemplateRef);
    }
  }

  clearCarTypeEdit() {
    this.carTypeToAdd = new CarTypeModel();
  }

  clearCarEdit() {
    this.carToAdd = new CarModel();
  }

  unchanged() {
    alert("Car vehicle license number in unchangable. \nIf needed, delete and add as new.")
  }

  public async cancelCarEdit(car: CarModel) {
    await this.carsService.getCarsByCarType(car.carTypeId);
    this.cars = store.getState().carsByCarType;

  }

  initBooksModel(car: CarModel) {
    const books = new BooksModel();
    books.cartType = this.carTypes.find(p => p.carTypeId == car.carTypeId);
    books.car = car;
    store.dispatch({ type: ActionType.GetRentsByCarId, payload: books });
  }

  async openCarsTable(i: number) {

    const carTypeId = this.carTypes[i].carTypeId;
    await this.carsService.getCarsByCarType(carTypeId);
    this.cars = store.getState().carsByCarType;

    if (this.index === -1)
      this.index = i;

    if (this.index === i && this.opened === false) {
      this.opened = true;
    }

    else if (this.index === i && this.opened === true) {
      this.opened = false;
    }

    else if (this.index !== i && this.opened === true) {
      console.log(this.opened)
      this.index = i;
      this.opened = true;
    }

    else if (this.index !== i && this.opened === false) {
      console.log(this.opened)
      this.index = i;
      this.opened = true;
    }
  }

  openDialog(templateRef) {

    this.localTemplateRef = this.dialog.open(templateRef, {
      width: "fit-content",
      panelClass: 'custom-dialog-container',
    });
  }

  onCloseDialog() {
    this.dialog.closeAll();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }
}

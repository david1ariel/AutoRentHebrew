import { CarModel } from "./car.model";
import { CarTypeModel } from "./carType.model";

export class BooksModel{
  public constructor(
      public cartType?: CarTypeModel,
      public car?: CarModel
  ) {}
}

export class RentModel{
  public constructor(
      public rentId?: number,
      public pickupDate?: Date,
      public returnDate?: Date,
      public practicalReturnDate?: Date,
      public userId?: string,
      public clientFullName?: string,
      public carId?: string,
      public employeeId?: string,
      public finalPayment?: number
  ) {}
}

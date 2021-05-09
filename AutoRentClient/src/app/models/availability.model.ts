export class AvailabilityModel{
    public constructor(
        public carId?: string,
        public carTypeId?: number,
        public pickupDate?: Date,
        public returnDate?: Date
    ) {}
}

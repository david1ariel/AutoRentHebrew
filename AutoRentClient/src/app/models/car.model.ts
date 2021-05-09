export class CarModel {

    public constructor(
        public carId?: string,
        public km?: number,
        public carTypeId?: number,
        public isFixed?: boolean,
        public isAvailable?: boolean,
        public branch?: string
    ) { }

}

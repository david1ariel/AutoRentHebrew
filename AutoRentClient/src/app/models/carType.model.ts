
export class CarTypeModel {

    public constructor(
        public carTypeId?: number,
        public manufacturer?: string,
        public model?: string,
        public pricePerDay?: number,
        public pricePerDayLate?: number,
        public year?: number,
        public gear?: string,
        public image?: File,
        public imageFileName?: string,
        public imageOnClient?: File


    ) { }

}

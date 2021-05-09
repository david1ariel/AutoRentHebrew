
export class HomeModel {

    public constructor(
        public mailingAdress?: string,
        public sundayToThursdayOpenHour?: string,
        public sundayToThursdayCloseHour?: string,
        public fridayOpenHour?: string,
        public fridayCloseHour?: string,
        public phone?: string,
        public fax?: string,
        public backgroundImage?: File,
        public backgroundImageFileName?: string

        ) { }

}

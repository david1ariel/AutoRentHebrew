
export class BranchModel {

    public constructor(
        public branchId?: number,
        public locationId?: number,
        public name?: string,
        public latitude?: number,
        public longitude?: number,
        public country?: string,
        public city?: string,
        public adressLine?: string,
        public postalZipCode?: string,
        
    ) { }

}

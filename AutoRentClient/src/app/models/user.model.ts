export class UserModel {

  public constructor(
    public userId?: string,
    public firstName?: string,
    public lastName?: string,
    public gender?: string,
    public birthDate?: Date,
    public email?: string,
    public username?: string,
    public password?: string,
    public jwtToken?: string,
    public role?: string,
    public image?: File,
    public imageFileName?: string,
    public country?: string,
    public city?: string,
    public adressLine?: string,
    public postalZipCode?: string,
    public branchId?: number,

  ) { }

}

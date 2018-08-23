export class Company {
    public static DEFAULT_IMAGE = 'assets/images/person.png';

    constructor(public id: number, public name: string, public minimumValue: number, public image: string){}

    public static createCompanyObject(user): Company{
        return new Company(user.id, user.name, user.minimumValue, user.image);
    }
}

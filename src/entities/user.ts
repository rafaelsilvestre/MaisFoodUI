export class User {
    id: string;
    name: string;
    lastName: string;
    displayName: string;
    email: string;
    gravatar: string;
    permissions: Array<string> = [];
    addressDefault: Array<any> = [];
    addresses: Array<any> = [];
    cards: Array<any> = [];
    company: any;

    constructor(id: number, name: string, lastName: string, displayName: string , email: string, gravatar: string, permissions: Array<string> = [], addressDefault: Array<any> = [], addresses: Array<any> = [], cards: Array<any> = [], company: any){}

    public static createUserObject(user): User{
        return new User(user.id, user.name, user.lastName, user.name + " " + user.lastName, user.email, user.gravatar, user.permissions, user.addressDefault, user.addresses, user.cards, user.companies);
    }
}

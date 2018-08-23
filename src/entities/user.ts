export class User {
    id: string;
    name: string;
    lastName: string;
    displayName: string;
    email: string;
    gravatar: string;

    constructor(id: number, name: string, lastName: string, displayName: string , email: string, gravatar: string){}

    public static createUserObject(user): User{
        return new User(user.id, user.name, user.lastName, user.name + " " + user.lastName, user.email, user.gravatar);
    }
}

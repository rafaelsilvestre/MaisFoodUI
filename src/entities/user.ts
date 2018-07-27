export class User {
    constructor(public id: number = null, public name: string = null, public lastName: string = null, public displayName: string = null, public email: string = null, public gravatar: string = null){}

    public static createUserObject(user): User{
        return new User(user.id, user.name, user.lastName, user.name + " " + user.lastName, user.email, user.gravatar);
    }
}

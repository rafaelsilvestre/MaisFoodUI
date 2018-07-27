import { Component } from '@angular/core';
import { UserServiceProvider } from '../../providers/services/user-service';
import { User } from '../../entities/user';

@Component({
    selector: 'users-page',
    templateUrl: './users.html',
    styleUrls: ['./users.css']
})
export class UsersPage {
    users: Array<User> = [];

    constructor(private userService: UserServiceProvider){
        this.userService.getAllUsers().then((users) => {
            this.users = users;
        })
    }
}

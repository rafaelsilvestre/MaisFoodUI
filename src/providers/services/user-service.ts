import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { sprintf } from 'sprintf-js';
import { User } from '../../entities/user';
import Utils from "../../utils/utils";

@Injectable()
export class UserServiceProvider{
    constructor(private http: HttpClient){}

    getAllUsers(): Promise<Array<User>>{
        return new Promise((resolve, reject) => {
            let allUsers: Array<User> = [];
            let usersPath = Utils.END_POINT_USERS;
            this.http.get(usersPath).subscribe((users: any) => {
                users.forEach((user) => {
                    allUsers.push(User.createUserObject(user));
                });
                if(users.length == allUsers.length)
                    resolve(allUsers);
            }, (error) => {
                reject(error);
            });
        });
    }

}

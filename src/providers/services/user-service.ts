import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { sprintf } from 'sprintf-js';
import { User } from '../../entities/user';
import Utils from "../../utils/utils";

@Injectable()
export class UserServiceProvider{
    constructor(private http: HttpClient){}

    getAllUsers(): Promise<Array<any>>{
        return new Promise((resolve, reject) => {
            let allUsers: Array<User> = [];
            let usersPath = Utils.END_POINT_USERS;
            this.http.get(usersPath).subscribe((users: any) => {
                resolve(users);
            }, (error) => {
                reject(error);
            });
        });
    }

    getUserPermission(): Promise<any>{
        return new Promise((resolve, reject) => {
            const userPermissionPath = Utils.END_POINT_USER_PERMISSIONS;
            this.http.get(userPermissionPath).subscribe((permission) => {
                resolve(permission);
            }, (error) => {
                reject(error);
            });
        })
    }

}

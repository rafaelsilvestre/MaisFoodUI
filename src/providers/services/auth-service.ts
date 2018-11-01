import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { sprintf } from 'sprintf-js';
import { UserServiceProvider } from './user-service';
import { Observable, Subscription } from 'rxjs';
import Utils from '../../utils/utils';
import {Permission} from '../../enums/permition';
import {reject} from 'q';
import {User} from '../../entities/user';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthServiceProvider{
    isLogged: boolean = false;
    userToken: string;
    jwtHelper: JwtHelper = new JwtHelper();

    loggedUserObservable: Observable<boolean>;
    loggedUserObservers: Array<Subscription> = [];



    constructor(private http: HttpClient, private userService: UserServiceProvider){
        const currentToken = localStorage.getItem('token');
        this.userToken = currentToken;
        if (currentToken && currentToken != null) {
            this.isLogged = true;
            this.informLoggedUserToObservers(true);
        }

        this.loggedUserObservable = Observable.create((observer) => {
            this.loggedUserObservers.push(observer);
            observer.next(this.isLogged);
        });
    }

    watchLoggedUser(): Observable<boolean> {
        return this.loggedUserObservable;
    }

    private informLoggedUserToObservers(isLogged: boolean): void {
        for (const observer of this.loggedUserObservers) {
            console.log("isLogged", isLogged);
            const time = setInterval(() => {
                console.log("Invocate new token");
            }, 2000);
            //}, 2700000);
            if(!isLogged) clearInterval(time);
            (<any>observer).next(isLogged);
        }
    }

    authUser(data): Promise<any>{
        return new Promise((resolve, reject) => {
           this.http.post(Utils.END_POINT_AUTH_USER, data, {observe: 'response', responseType: 'json'}).subscribe((result: any) => {
               let authValue = result.headers.get('Authorization');
               if(authValue == null){
                   reject();
                   return;
               }

               // Save this token in localStorage
               this.authenticationSuccessfully(authValue);

               // Return permissions this user
               if (result && result.body && (result.body.role != Permission.ADMIN && result.body.role != Permission.COMPANY)){
                   this.authenticationSuccessfully(null);
                   this.informLoggedUserToObservers(false);
                   reject('permission-danied');
                   return;
               }

               // Inform user logged
               this.informLoggedUserToObservers(true);

               // Set permission in localStorage
               localStorage.setItem('role', result.body.role);
               localStorage.setItem('user_id', result.body.user_id);

               if(result && result.body && result.body.role === Permission.COMPANY){
                   localStorage.setItem('company_id', result.body.company_id);
               }

               resolve(result.body);
           }, (error) => {
               if(error &&  error.status && error.status == 403){
                   reject('account-not-found');
                   return;
               }
               reject(error);
           });
        });
    }

    getUserLogged(): Promise<User>{
        return new Promise((resolve, reject) => {
            const userProfile = Utils.END_POINT_USER_LOGGED_PROFILE;
            this.http.get(userProfile).subscribe((user: any) => {
                resolve(user);
            }, (error) => {
                reject(error);
            });
        });
    }

    authenticationSuccessfully(authValue: String): Promise<any>{
        return new Promise((resolve, reject) => {
            if(authValue == null){
                localStorage.removeItem('token');
                return;
            }
             let token = authValue.substring(7);
            localStorage.setItem('token', token);
        });
    }

    logOut() : void{
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('company_id');
        localStorage.removeItem('role');
        this.isLogged = false;
        this.informLoggedUserToObservers(false);
    }
}

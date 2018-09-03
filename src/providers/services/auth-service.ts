import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { sprintf } from 'sprintf-js';
import {reject} from 'q';
import Utils from '../../utils/utils';
import {Observable, Subscription} from 'rxjs';

@Injectable()
export class AuthServiceProvider{
    isLogged: boolean = false;

    userFbSubscription: Subscription;
    loggedUserObservable: Observable<boolean>;
    loggedUserObservers: Array<Subscription> = [];

    constructor(private http: HttpClient){
        let currentToken = (<any>window).localStorage.getItem('token');
        if (currentToken && currentToken != null) this.isLogged = true;

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
            (<any>observer).next(isLogged);
        }
    }

    authUser(data): Promise<any>{
        return new Promise((resolve, reject) => {
           this.http.post(Utils.END_POINT_AUTH_USER, data, {observe: 'response', responseType: 'text'}).subscribe((result) => {
               let authValue = result.headers.get('Authorization');
               if(authValue == null){
                   reject();
                   return;
               }

               this.informLoggedUserToObservers(true);
               this.authenticationSuccessfully(authValue);
               resolve(result);
           }, (error) => {
               reject(error);
           });
        });
    }

    authenticationSuccessfully(authValue: String): Promise<any>{
        return new Promise((resolve, reject) => {
             let token = authValue.substring(7);
            (<any>window).localStorage.setItem("token", token);
        });
    }

    logOut() : void{
        (<any>window).localStorage.removeItem('token');
        this.isLogged = false;
        this.informLoggedUserToObservers(false);
    }
}

import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { sprintf } from 'sprintf-js';
import {reject} from 'q';
import Utils from '../../utils/utils';

@Injectable()
export class AuthServiceProvider{
    constructor(private http: HttpClient){}

    authUser(data): Promise<any>{
        return new Promise((resolve, reject) => {
           this.http.post(Utils.END_POINT_AUTH_USER, data).subscribe((result) => {
              resolve(result);
           }, (error) => {
               reject(error);
           });
        });
    }

}

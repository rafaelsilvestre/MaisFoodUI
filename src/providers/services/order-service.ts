import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Filter } from '../../entities/filter';
import { sprintf } from 'sprintf-js';
import Utils from "../../utils/utils";

@Injectable()
export class OrderServiceProvider{
    constructor(private http: HttpClient){}

    getAllMyOrder(): Promise<Array<Filter>>{
        return new Promise((resolve, reject) => {
            let orderPath = Utils.END_POINT_ORDERS;
            this.http.get(orderPath).subscribe((orders: any) => {
                resolve(orders);
            }, (error) => {
                reject(error);
            });
        });
    }
}

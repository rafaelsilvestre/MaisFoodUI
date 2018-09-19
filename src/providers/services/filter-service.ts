import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Filter } from '../../entities/filter';
import { sprintf } from 'sprintf-js';
import Utils from "../../utils/utils";

@Injectable()
export class FilterServiceProvider{
    constructor(private http: HttpClient){}

    getAllFilters(): Promise<Array<Filter>>{
        return new Promise((resolve, reject) => {
            let allFilters: Array<Filter> = [];
            let filtersPath = Utils.END_POINT_FILTERS;
            this.http.get(filtersPath).subscribe((filters: any) => {
                filters.forEach((filter) => {
                    allFilters.push(Filter.createFilterObject(filter));
                });
                if(filters.length == allFilters.length)
                    resolve(allFilters);
            }, (error) => {
                reject(error);
            });
        });
    }

    saveFilter(data: any): Promise<any>{
        return new Promise((resolve, reject) => {
            let filtersPath = Utils.END_POINT_FILTERS;
            this.http.post(filtersPath, data).subscribe((filters: any) => {
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    }

    deleteFilter(filterId: number): Promise<any>{
        return new Promise((resolve, reject) => {
            if(filterId == null){
                reject();
                return;
            }

            let filtersPath = sprintf(Utils.END_POINT_FILTER, filterId);
            this.http.delete(filtersPath).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }
}

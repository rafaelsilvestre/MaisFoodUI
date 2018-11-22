import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { sprintf } from 'sprintf-js';
import Utils from "../../utils/utils";

@Injectable()
export class DistrictServiceProvider{
    constructor(private http: HttpClient){}

    getAllDistricts(): Promise<Array<any>>{
        return new Promise((resolve, reject) => {
            let districtsPath = Utils.END_POINT_DISTRICTS;
            this.http.get(districtsPath).subscribe((districts: any) => {
                resolve(districts);
            }, (error) => {
                reject(error);
            });
        });
    }

    getAllDistrictsByCompany(companyId: number): Promise<Array<any>>{
        return new Promise((resolve, reject) => {
            let districtsPath = sprintf(Utils.END_POINT_COMPANY_DISTRICTS, companyId);
            this.http.get(districtsPath).subscribe((districts: any) => {
                resolve(districts);
            }, (error) => {
                reject(error);
            });
        });
    }

    saveDistrictsByCompany(companyId: number, districts: any): Promise<Array<any>>{
        return new Promise((resolve, reject) => {
            let districtsPath = sprintf(Utils.END_POINT_COMPANY_DISTRICTS, companyId);
            this.http.post(districtsPath, districts).subscribe((districts: any) => {
                resolve(districts);
            }, (error) => {
                reject(error);
            });
        });
    }

    deleteDistrictsByCompany(companyId: number, districts: any): Promise<Array<any>>{
        return new Promise((resolve, reject) => {
            let districtsPath = sprintf(Utils.END_POINT_COMPANY_DISTRICTS, companyId) + '/delete';
            this.http.post(districtsPath, districts).subscribe((districts: any) => {
                resolve(districts);
            }, (error) => {
                reject(error);
            });
        });
    }
}

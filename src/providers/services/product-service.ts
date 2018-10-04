import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { sprintf } from 'sprintf-js';
import Utils from "../../utils/utils";

@Injectable()
export class ProductServiceProvider{
    constructor(private http: HttpClient){}

    getAllProductsByCompany(companyId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let companyProductsPath = sprintf(Utils.END_POINT_COMPANY_PRODUCTS, companyId);
            this.http.get(companyProductsPath).subscribe((products) => {
                resolve(products);
            }, (error) => {
                reject(error);
            });
        });
    }

    saveProductByCompany(companyId: number, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let companyProductsPath = sprintf(Utils.END_POINT_COMPANY_PRODUCTS, companyId);
            this.http.post(companyProductsPath, data).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            })
        });
    }
}

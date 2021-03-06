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

    deleteProduct(productId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let productPath = sprintf(Utils.END_POINT_PRODUCT, productId);
            this.http.delete(productPath).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        })
    }

    getProductById(productId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let productPath = sprintf(Utils.END_POINT_PRODUCT_DATA, productId);
            this.http.get(productPath).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    updateProduct(productId: number, requestData: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let productPath = sprintf(Utils.END_POINT_PRODUCT, productId);
            this.http.put(productPath, requestData).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    saveImageProduct(file: any, productId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            if(file == null)
                return;

            let companiesPath = sprintf(Utils.END_POINT_PRODUCT_IMAGE, productId);

            let formData: FormData = new FormData();
            formData.set('file', file, file.name);

            this.http.post(companiesPath, formData).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            })
        });
    }
}

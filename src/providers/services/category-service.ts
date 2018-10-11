import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { sprintf } from 'sprintf-js';
import Utils from "../../utils/utils";

@Injectable()
export class CategoryServiceProvider{
    constructor(private http: HttpClient){}

    getAllCategories(): Promise<Array<any>>{
        return new Promise((resolve, reject) => {
            let categoriesPath = Utils.END_POINT_CATEGORIES;
            this.http.get(categoriesPath).subscribe((categories: any) => {
                resolve(categories);
            }, (error) => {
                reject(error);
            });
        });
    }

    saveCategory(formData: any): Promise<any>{
        let data = {
            categoryName: formData.name,
        };

        return new Promise((resolve, reject) => {
            let categoriesPath = Utils.END_POINT_CATEGORIES;
            this.http.post(categoriesPath, data).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            })
        });
    }
}

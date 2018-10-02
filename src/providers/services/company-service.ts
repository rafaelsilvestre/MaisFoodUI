import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Company } from '../../entities/company';
import { sprintf } from 'sprintf-js';
import Utils from "../../utils/utils";
import {User} from '../../entities/user';

@Injectable()
export class CompanyServiceProvider{
    constructor(private http: HttpClient){}

    getAllCompanies(): Promise<Array<any>>{
        return new Promise((resolve, reject) => {
            let allCompanies: Array<Company> = [];
            let companiesPath = Utils.END_POINT_COMPANIES;
            this.http.get(companiesPath).subscribe((companies: any) => {
                companies.forEach((company) => {
                    allCompanies.push(Company.createCompanyObject(company));
                });
                if(companies.length == allCompanies.length)
                    resolve(allCompanies);
            }, (error) => {
                reject(error);
            });
        });
    }

    saveCompany(formData: any): Promise<any>{
        let data = {
            // Company data
            companyName: formData.name,
            description: formData.description,
            minimumValue: Number(formData.minimum_value),
            image: 'https://3.kekantoimg.com/qBML1ugEVRfkSgoK4DJ5p-HanPI=/300x300/s3.amazonaws.com/kekanto_pics/pics/211/857211.jpg',
            // User data
            categories: formData.categories,
            ownerName: formData.name_owner,
            ownerLastname: formData.lastname_owner,
            email: formData.email,
            password: formData.password
        };

        return new Promise((resolve, reject) => {
            let companiesPath = Utils.END_POINT_COMPANIES;
            this.http.post(companiesPath, data).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            })
        });
    }

    deleteCompany(companyId: number): Promise<any>{
        return new Promise((resolve, reject) => {
            let companiesPath = sprintf(Utils.END_POINT_COMPANY, companyId);
            this.http.delete(companiesPath).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

}

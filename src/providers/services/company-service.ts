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

}

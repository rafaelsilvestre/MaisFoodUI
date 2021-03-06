import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
            image: '',
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

    saveImageCompany(file: any, companyId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let companiesPath = sprintf(Utils.END_POINT_COMPANY_IMAGE, companyId);

            let formData: FormData = new FormData();
            formData.set('file', file, file.name);

            this.http.post(companiesPath, formData).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            })
        });
    }

    getCompanyById(companyId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let companyPath = sprintf(Utils.END_POINT_COMPANY, companyId);
            this.http.get(companyPath).subscribe((company) => {
                resolve(company);
            }, (error) => {
                reject(error);
            })
        });
    }

    getCompanyByUserLogged(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(Utils.END_POINT_COMPANY_DATA_USER_LOGGED).subscribe((company) => {
                resolve(company);
            }, (error) => {
                reject(error);
            })
        });
    }

    deleteCompany(companyId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let companiesPath = sprintf(Utils.END_POINT_COMPANY, companyId);
            this.http.delete(companiesPath).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    updateCompany(companyId: number, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let companiesPath = sprintf(Utils.END_POINT_COMPANY, companyId);
            this.http.put(companiesPath, data).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    getWorkedDays(companyId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let workedDaysPath = sprintf(Utils.END_POINT_COMPANY_WORKED_DAYS, companyId);
            this.http.get(workedDaysPath).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }

    saveWorkedDays(workedDays: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let companyId = localStorage.getItem("company_id");
            if(companyId == null){
                reject();
                return;
            }

            let workedDaysPath = sprintf(Utils.END_POINT_COMPANY_WORKED_DAYS, companyId);
            this.http.post(workedDaysPath, workedDays).subscribe((result) => {
                resolve(result);
            }, (error) => {
                reject(error);
            });
        });
    }
}
